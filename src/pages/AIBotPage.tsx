import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';

export default function AIBotPage() {
  // State to track if the chatbase script has finished loading
  const [isChatbaseLoaded, setChatbaseLoaded] = useState(false);

  useEffect(() => {
    // This configuration object tells the script which chatbot to load.
    // The script will look for this global variable.
    window.chatbaseConfig = {
      chatbotId: "CTWS47NM3u2POJw7dQqID",
    };

    // Check if the script already exists to avoid adding it multiple times
    if (!document.getElementById('chatbase-embed-script')) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "chatbase-embed-script";
      script.defer = true;
      
      // When the script successfully loads, update the state
      script.onload = () => {
        setChatbaseLoaded(true);
      };
      
      document.body.appendChild(script);
    } else {
      // If script is already there, assume it's loaded or will load
      setChatbaseLoaded(true);
    }

    // Cleanup function to remove the script and config when the component unmounts
    return () => {
      const existingScript = document.getElementById("chatbase-embed-script");
      if (existingScript) {
        existingScript.remove();
      }
      // Remove the chatbot UI created by Chatbase
      const chatbaseBot = document.getElementById("chatbasebot");
      if(chatbaseBot) {
        chatbaseBot.remove();
      }
      delete window.chatbaseConfig;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

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

        {/* Main Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          // This container will hold the chat widget. Chatbase creates an iframe.
          // Setting a specific height is crucial for the iframe to be visible.
          className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px] flex flex-col"
        >
          {/* We only show the loading spinner if the chatbase script hasn't loaded yet */}
          {!isChatbaseLoaded && (
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600">Loading your AI financial coach...</p>
              </div>
            </div>
          )}
          
          {/* This div is the target for the Chatbase iframe. 
              The script will automatically find window.chatbaseConfig and inject the bot.
              It needs to be present in the DOM for the chatbot to appear.
              When `isChatbaseLoaded` is true, the loading spinner above is removed, 
              allowing the chatbot iframe to be visible and interactive.
           */}
        </motion.div>
      </div>
    </div>
  );
}