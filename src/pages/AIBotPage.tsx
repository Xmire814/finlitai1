import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Bot, MessageCircle, Send, Lightbulb, DollarSign, TrendingUp, PiggyBank, CreditCard, Home, Star, Clock, Shield, Users } from 'lucide-react';

const quickPrompts = [
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: "Budget Help",
    prompt: "Help me create my first budget. I earn $4,000 per month and want to save for an emergency fund.",
    category: "budgeting"
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Investment Advice",
    prompt: "I'm 25 years old with $5,000 to invest. What's the best way to start investing for long-term growth?",
    category: "investing"
  },
  {
    icon: <PiggyBank className="h-5 w-5" />,
    title: "Emergency Fund",
    prompt: "How much should I save for an emergency fund and what's the best account to keep it in?",
    category: "savings"
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Debt Strategy",
    prompt: "I have $15,000 in credit card debt across 3 cards. What's the best strategy to pay them off?",
    category: "debt"
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: "Home Buying",
    prompt: "I want to buy my first home in 2 years. How much should I save for a down payment and what steps should I take?",
    category: "planning"
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Financial Goals",
    prompt: "Help me set realistic financial goals for the next 5 years. I want to be financially independent.",
    category: "planning"
  }
];

const features = [
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: "Secure & Private",
    description: "Your financial information is encrypted and never stored permanently."
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "24/7 Availability",
    description: "Get financial guidance whenever you need it, day or night."
  },
  {
    icon: <Users className="h-8 w-8 text-purple-600" />,
    title: "Personalized Advice",
    description: "Tailored recommendations based on your unique financial situation."
  }
];

export default function AIBotPage() {
  const [isBotLoading, setIsBotLoading] = useState(true);
  const [isBotReady, setIsBotReady] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Initialize Chatbase with proper configuration
    const initializeChatbase = () => {
      // Set up the configuration
      window.chatbaseConfig = {
        chatbotId: "CTWS47NM3u2POJw7dQqID",
        domain: "www.chatbase.co"
      };

      // Initialize the chatbase function if it doesn't exist
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...arguments) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(arguments);
        };
        
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          }
        });
      }

      // Create and load the script
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "chatbase-embed-script";
      script.defer = true;
      script.onload = () => {
        setIsBotLoading(false);
        setIsBotReady(true);
        
        // Configure the bot appearance
        setTimeout(() => {
          if (window.chatbase) {
            window.chatbase('config', {
              theme: 'modern',
              primaryColor: '#7c3aed',
              chatHeight: '600px',
              chatWidth: '100%',
              placeholder: 'Ask me anything about your finances...',
              initialMessages: [
                "👋 Hi! I'm your AI Financial Coach. I'm here to help you with budgeting, investing, debt management, and achieving your financial goals.",
                "💡 Try one of the quick prompts on the left, or ask me anything about your finances!"
              ]
            });
          }
        }, 1000);
      };
      
      script.onerror = () => {
        setIsBotLoading(false);
        console.error('Failed to load Chatbase script');
      };
      
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      initializeChatbase();
    } else {
      window.addEventListener("load", initializeChatbase);
    }

    return () => {
      // Cleanup
      const existingScript = document.getElementById("chatbase-embed-script");
      if (existingScript) {
        existingScript.remove();
      }
      const botElement = document.getElementById("chatbasebot");
      if (botElement) {
        botElement.remove();
      }
      delete window.chatbaseConfig;
      window.removeEventListener("load", initializeChatbase);
    };
  }, []);

  const handleQuickPrompt = (prompt) => {
    if (window.chatbase && isBotReady) {
      try {
        window.chatbase('sendMessage', prompt);
        // Scroll to chat if needed
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert("Sorry, there was an error sending your message. Please try again.");
      }
    } else {
      alert("AI Coach is still initializing. Please wait a moment and try again.");
    }
  };

  const filteredPrompts = selectedCategory === 'all' 
    ? quickPrompts 
    : quickPrompts.filter(prompt => prompt.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'budgeting', name: 'Budgeting' },
    { id: 'investing', name: 'Investing' },
    { id: 'savings', name: 'Savings' },
    { id: 'debt', name: 'Debt' },
    { id: 'planning', name: 'Planning' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Simple Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FINLIT AI</h1>
            </div>
            <div className="text-sm text-gray-500">
              Your Personal Financial Coach
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FINLIT AI - Your Personal Financial Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized financial advice, explore scenarios, and receive expert guidance tailored to your unique situation.
          </p>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <div className="flex -space-x-1 mr-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
              </div>
              <span>Trusted by 10,000+ users</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Quick Prompts Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Start Topics
              </h3>
              
              {/* Category Filter */}
              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group hover:scale-[1.02] hover:shadow-md"
                    disabled={!isBotReady}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-purple-600 group-hover:text-purple-700 mt-1">
                        {prompt.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">
                          {prompt.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {prompt.prompt.substring(0, 80)}...
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {!isBotReady && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    🤖 AI Coach is loading... Please wait a moment.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Chat Interface */}
          <div className="lg:col-span-3" ref={chatContainerRef}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">AI Financial Coach</h3>
                      <p className="text-purple-100 text-sm">
                        {isBotReady ? "Online & Ready to Help" : "Getting Ready..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isBotReady ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Chat Container */}
              <div className="h-[600px] relative">
                {isBotLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading AI Financial Coach...</p>
                      <p className="text-sm text-gray-500 mt-2">Setting up your personalized experience</p>
                    </div>
                  </div>
                )}
                
                {!isBotLoading && !isBotReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                    <div className="text-center">
                      <div className="text-red-600 mb-2">⚠️</div>
                      <p className="text-red-600">Failed to load AI Coach</p>
                      <button 
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}
                
                {/* The chatbot will be injected here by the Chatbase script */}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose FINLIT AI?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered financial coach provides expert guidance with the convenience of instant access and personalized recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Tips */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">💡 Tips for Better Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="text-left">
                <h3 className="font-semibold mb-2">Be Specific</h3>
                <p className="text-purple-100 text-sm">
                  Include your age, income, debt amounts, and specific goals for more tailored advice.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Ask Follow-ups</h3>
                <p className="text-purple-100 text-sm">
                  Don't hesitate to ask for clarification or dive deeper into any topic.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Explore Scenarios</h3>
                <p className="text-purple-100 text-sm">
                  Ask "What if..." questions to explore different financial strategies.
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-2">Regular Check-ins</h3>
                <p className="text-purple-100 text-sm">
                  Come back regularly to track progress and adjust your financial plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}