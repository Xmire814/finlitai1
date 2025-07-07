import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, DollarSign, TrendingUp, PiggyBank, CreditCard, Home, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';

// Quick Prompts data with improved structure
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
    category: "realestate"
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Financial Goals",
    prompt: "Help me set realistic financial goals for the next 5 years. I want to be financially independent.",
    category: "planning"
  }
];

export default function AIBotPage() {
  const [chatbotLoaded, setChatbotLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const scriptLoadedRef = useRef(false);
  const retryTimeoutRef = useRef(null);

  // Enhanced Chatbase script loading with better error handling
  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const loadChatbase = () => {
      try {
        // Configure Chatbase
        window.chatbaseConfig = {
          chatbotId: "CTWS47NM3u2POJw7dQqID",
          domain: window.location.hostname,
        };

        // Create and append script
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "chatbase-embed-script";
        script.defer = true;
        script.async = true;

        // Handle successful load
        script.onload = () => {
          setChatbotLoaded(true);
          setLoadingError(false);
          scriptLoadedRef.current = true;
        };

        // Handle load errors
        script.onerror = () => {
          setLoadingError(true);
          setChatbotLoaded(false);
          
          // Retry after 3 seconds
          retryTimeoutRef.current = setTimeout(() => {
            if (!scriptLoadedRef.current) {
              loadChatbase();
            }
          }, 3000);
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error('Failed to load Chatbase:', error);
        setLoadingError(true);
      }
    };

    loadChatbase();

    // Cleanup function
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      
      const existingScript = document.getElementById("chatbase-embed-script");
      if (existingScript) {
        existingScript.remove();
      }
      
      const botElement = document.getElementById("chatbasebot");
      if (botElement) {
        botElement.remove();
      }
      
      // Clean up global variables
      if (window.chatbaseConfig) {
        delete window.chatbaseConfig;
      }
      if (window.chatbase) {
        delete window.chatbase;
      }
    };
  }, []);

  // Enhanced quick prompt handler with better error handling
  const handleQuickPrompt = (prompt, category) => {
    try {
      // Check if Chatbase is available and ready
      if (window.chatbase && typeof window.chatbase.sendMessage === 'function') {
        window.chatbase.sendMessage(prompt);
        
        // Optional: Track usage analytics
        if (window.gtag) {
          window.gtag('event', 'quick_prompt_used', {
            category: category,
            prompt_title: prompt.substring(0, 50)
          });
        }
      } else if (chatbotLoaded) {
        // Chatbase loaded but sendMessage not available yet, retry
        setTimeout(() => handleQuickPrompt(prompt, category), 1000);
      } else {
        // Fallback: show user-friendly message
        alert("AI Coach is still loading. Please wait a moment and try again.");
      }
    } catch (error) {
      console.error('Error sending message to Chatbase:', error);
      alert("There was an issue sending your message. Please try again.");
    }
  };

  // Retry loading function
  const retryLoad = () => {
    setLoadingError(false);
    setChatbotLoaded(false);
    scriptLoadedRef.current = false;
    
    const existingScript = document.getElementById("chatbase-embed-script");
    if (existingScript) {
      existingScript.remove();
    }
    
    // Trigger reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          {/* Quick Prompts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
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
                    onClick={() => handleQuickPrompt(prompt.prompt, prompt.category)}
                    disabled={!chatbotLoaded}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group ${
                      chatbotLoaded 
                        ? 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer' 
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${
                        chatbotLoaded 
                          ? 'text-purple-600 group-hover:text-purple-700' 
                          : 'text-gray-400'
                      }`}>
                        {prompt.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{prompt.title}</div>
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
                    chatbotLoaded ? 'bg-green-500' : loadingError ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-gray-600">
                    {chatbotLoaded ? 'AI Coach Ready' : loadingError ? 'Connection Error' : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl h-[700px] w-full relative overflow-hidden">
              {/* Loading State */}
              {!chatbotLoaded && !loadingError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading AI Coach...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {loadingError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Unable to load AI Coach</p>
                    <button
                      onClick={retryLoad}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {/* Chat Interface Container */}
              <div id="chatbase-container" className="h-full w-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}