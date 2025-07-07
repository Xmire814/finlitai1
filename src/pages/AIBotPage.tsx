import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, MessageCircle, Send, Lightbulb, DollarSign, TrendingUp, PiggyBank, CreditCard, Home } from 'lucide-react';
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


export default function AIBotPage() {
  const [isBotLoading, setIsBotLoading] = useState(true);

  // This hook contains the logic from your script tag.
  // It runs only once when the page loads.
  useEffect(() => {
    // To make the bot embed inside your layout (and not float), we must define this config object.
    // The script will look for it.
    window.chatbaseConfig = {
      chatbotId: "CTWS47NM3u2POJw7dQqID",
    };

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "chatbase-embed-script";
    script.defer = true;
    
    // When the script loads, we can hide our loading message
    script.onload = () => {
      setIsBotLoading(false);
    };
    
    document.body.appendChild(script);

    // This cleanup function is vital. It runs when you leave the page.
    return () => {
      const existingScript = document.getElementById("chatbase-embed-script");
      if (existingScript) {
        existingScript.remove();
      }
      const botElement = document.getElementById("chatbasebot");
      if (botElement) {
        botElement.remove();
      }
      delete window.chatbaseConfig;
    };
  }, []); // Empty array means this effect runs only once.

  // This function lets your sidebar "talk" to the Chatbase bot
  const handleQuickPrompt = (prompt) => {
    if (window.chatbase && typeof window.chatbase.sendMessage === 'function') {
      window.chatbase.sendMessage(prompt);
    } else {
      alert("AI Coach is still initializing. Please wait a moment and try again.");
    }
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

        {/* This title section is unchanged */}
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
          {/* This Quick Prompts sidebar is unchanged */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
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
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-600 group-hover:text-purple-700">
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
            </div>
          </motion.div>

          {/* Main Chat Interface - REPLACED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-xl flex flex-col h-[700px] justify-center items-center">
              {/* The mock chat is gone. This container now holds the real bot. */}
              {isBotLoading && (
                <div className="text-center">
                  <p className="text-gray-600">Loading AI Financial Coach...</p>
                </div>
              )}
              {/* The Chatbase script will automatically find its config and render the bot here.
                  The loading message will disappear once it's ready. */}
            </div>
          </motion.div>
        </div>

        {/* This features grid is unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Feature cards go here... */}
        </div>
      </div>
    </div>
  );
}