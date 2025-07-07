import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, MessageCircle, Send, Lightbulb, DollarSign, TrendingUp, PiggyBank, CreditCard, Home, Calculator, Target, Shield, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';

// Your Quick Prompts data remains exactly the same
const quickPrompts = [
 {
     icon: <DollarSign className="h-5 w-5" />,
     title: "Budget Help",
     prompt: "Help me create my first budget. I earn $4,000 per month and want to save for an emergency fund."
   },
   {
     icon: <TrendingUp className="h-5 w-5" />,
     title: "Investment Advice",
     prompt: "I'm 25 years old with $5,000 to invest. What's the best way to start investing for long-term growth?"
   },
   {
     icon: <PiggyBank className="h-5 w-5" />,
     title: "Emergency Fund",
     prompt: "How much should I save for an emergency fund and what's the best account to keep it in?"
   },
   {
     icon: <CreditCard className="h-5 w-5" />,
     title: "Debt Strategy",
     prompt: "I have $15,000 in credit card debt across 3 cards. What's the best strategy to pay them off?"
   },
   {
     icon: <Home className="h-5 w-5" />,
     title: "Home Buying",
     prompt: "I want to buy my first home in 2 years. How much should I save for a down payment and what steps should I take?"
   },
   {
     icon: <Lightbulb className="h-5 w-5" />,
     title: "Financial Goals",
     prompt: "Help me set realistic financial goals for the next 5 years. I want to be financially independent."
   }
];

// Simulation scenarios for the bottom buttons
const simulationScenarios = [
  {
    icon: <Calculator className="h-4 w-4" />,
    title: "Retirement Planning",
    prompt: "Run a retirement simulation: I'm 30 years old, earning $60k annually, and want to retire at 65 with $1M. Show me different savings rate scenarios (10%, 15%, 20%) and their outcomes over 35 years.",
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    icon: <Target className="h-4 w-4" />,
    title: "Investment Growth",
    prompt: "Simulate investment growth: Compare $500/month invested in index funds vs individual stocks vs bonds over 20 years. Show me the potential returns and risk levels for each strategy.",
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Emergency Fund",
    prompt: "Emergency fund simulation: Show me how different emergency fund sizes (3, 6, 12 months of expenses) would help in various crisis scenarios like job loss, medical emergencies, or major home repairs.",
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    icon: <TrendingDown className="h-4 w-4" />,
    title: "Debt Payoff",
    prompt: "Debt payoff simulation: I have $25k in various debts (credit cards, personal loan, car loan). Compare avalanche vs snowball methods and show timeline with extra payments of $200, $500, or $1000 monthly.",
    color: "bg-red-500 hover:bg-red-600"
  }
];

export default function AIBotPage() {
  const [isBotLoading, setIsBotLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Enhanced Chatbase integration with your provided script logic
  useEffect(() => {
    // Initialize Chatbase with the proper proxy setup from your script
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

    // Set up the configuration for embedded mode
    window.chatbaseConfig = {
      chatbotId: "CTWS47NM3u2POJw7dQqID",
      domain: "www.chatbase.co"
    };

    const loadChatbase = () => {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "CTWS47NM3u2POJw7dQqID";
      script.domain = "www.chatbase.co";
      script.defer = true;
      
      // Enhanced loading detection
      script.onload = () => {
        console.log("Chatbase script loaded successfully");
        setIsBotLoading(false);
        setRetryCount(0);
      };
      
      script.onerror = () => {
        console.error("Failed to load Chatbase script");
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            loadChatbase();
          }, 2000);
        } else {
          setIsBotLoading(false);
        }
      };
      
      document.body.appendChild(script);
    };

    // Load immediately if document is ready, otherwise wait for load event
    if (document.readyState === "complete") {
      loadChatbase();
    } else {
      window.addEventListener("load", loadChatbase);
    }

    // Cleanup function
    return () => {
      window.removeEventListener("load", loadChatbase);
      const existingScript = document.getElementById("CTWS47NM3u2POJw7dQqID");
      if (existingScript) {
        existingScript.remove();
      }
      const botElement = document.getElementById("chatbasebot");
      if (botElement) {
        botElement.remove();
      }
      if (window.chatbaseConfig) {
        delete window.chatbaseConfig;
      }
    };
  }, [retryCount]);

  // Enhanced quick prompt handler
  const handleQuickPrompt = (prompt) => {
    try {
      if (window.chatbase && typeof window.chatbase.sendMessage === 'function') {
        window.chatbase.sendMessage(prompt);
      } else if (window.chatbase && window.chatbase.q) {
        // If chatbase is still initializing, queue the message
        window.chatbase("sendMessage", prompt);
      } else {
        alert("AI Coach is still initializing. Please wait a moment and try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("There was an issue sending your message. Please try again.");
    }
  };

  // Handle simulation button clicks
  const handleSimulationClick = (scenario) => {
    handleQuickPrompt(scenario.prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Title section */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
        >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              FINLIT AI - Your Personal Financial Coach
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized financial advice, explore scenarios, and receive expert guidance tailored to your unique situation.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Prompts sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Start Topics
              </h3>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    disabled={isBotLoading}
                    className={`w-full text-left p-3 rounded-lg border transition-all group ${
                      isBotLoading 
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${
                        isBotLoading 
                          ? 'text-gray-400' 
                          : 'text-purple-600 group-hover:text-purple-700'
                      }`}>
                        {prompt.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {prompt.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {prompt.prompt.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Status indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    isBotLoading ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="text-gray-600">
                    {isBotLoading ? 'Loading AI Coach...' : 'AI Coach Ready'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl flex flex-col h-[700px] relative">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 rounded-t-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <h3 className="font-semibold">FINLIT AI Coach</h3>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      isBotLoading ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <span className="text-sm">{isBotLoading ? 'Connecting...' : 'Online'}</span>
                  </div>
                </div>
              </div>

              {/* Chatbase Container */}
              <div className="flex-1 relative">
                {isBotLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading AI Financial Coach...</p>
                      {retryCount > 0 && (
                        <p className="text-sm text-gray-500 mt-2">Retry attempt {retryCount}/3</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* This is where Chatbase will inject the chat interface */}
                <div id="chatbase-container" className="h-full w-full"></div>
              </div>

              {/* Simulation Buttons Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700 mb-2 block">💡 Financial Simulations - Click to explore:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {simulationScenarios.map((scenario, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSimulationClick(scenario)}
                        disabled={isBotLoading}
                        className={`${scenario.color} text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                          isBotLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                        }`}
                      >
                        {scenario.icon}
                        <span>{scenario.title}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  💬 Use the buttons above to run financial simulations, or type your own questions!
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Calculator className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold">Smart Calculations</h3>
            </div>
            <p className="text-gray-600">Get instant calculations for budgets, investments, loan payments, and retirement planning.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Target className="h-8 w-8 text-green-600" />
              <h3 className="text-lg font-semibold">Goal Planning</h3>
            </div>
            <p className="text-gray-600">Set and track your financial goals with personalized roadmaps and milestone tracking.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-8 w-8 text-purple-600" />
              <h3 className="text-lg font-semibold">Risk Assessment</h3>
            </div>
            <p className="text-gray-600">Analyze your financial risks and get recommendations for insurance and emergency planning.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}