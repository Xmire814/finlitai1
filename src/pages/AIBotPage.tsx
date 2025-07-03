import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';

export default function AIBotPage() {
  useEffect(() => {
    // Initialize Chatbase with your specific configuration
    (function(){
      if(!window.chatbase||window.chatbase("getState")!=="initialized"){
        window.chatbase=(...args)=>{
          if(!window.chatbase.q){
            window.chatbase.q=[]
          }
          window.chatbase.q.push(args)
        };
        window.chatbase=new Proxy(window.chatbase,{
          get(target,prop){
            if(prop==="q"){
              return target.q
            }
            return(...params)=>target(prop,...params)
          }
        })
      }
      
      const onLoad=function(){
        const script=document.createElement("script");
        script.src="https://www.chatbase.co/embed.min.js";
        script.id="CTWS47NM3u2POJw7dQqID";
        script.domain="www.chatbase.co";
        document.body.appendChild(script)
      };
      
      if(document.readyState==="complete"){
        onLoad()
      }else{
        window.addEventListener("load",onLoad)
      }
    })();

    // Cleanup function
    return () => {
      const existingScript = document.getElementById("CTWS47NM3u2POJw7dQqID");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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
          className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">FINLIT AI Coach</h3>
                <p className="text-sm text-gray-600">Powered by advanced AI technology</p>
              </div>
            </div>
          </div>

          {/* Chatbase will inject the chat interface here */}
          <div id="chatbase-container" className="min-h-[400px]">
            {/* Loading state while Chatbase initializes */}
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600">Loading your AI financial coach...</p>
              </div>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">💡 Quick Start Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h5 className="font-medium text-gray-800">Popular Topics:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• "Help me create my first budget"</li>
                  <li>• "How should I start investing?"</li>
                  <li>• "What's the best way to pay off debt?"</li>
                  <li>• "How much should I save for emergencies?"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-gray-800">Advanced Questions:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• "Should I buy or lease a car?"</li>
                  <li>• "How do I plan for retirement?"</li>
                  <li>• "What insurance do I need?"</li>
                  <li>• "How can I improve my credit score?"</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">24/7 Availability</h3>
            <p className="text-gray-600 text-sm">Get financial guidance whenever you need it, day or night.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Advice</h3>
            <p className="text-gray-600 text-sm">Receive tailored recommendations based on your unique situation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expert Knowledge</h3>
            <p className="text-gray-600 text-sm">Access comprehensive financial expertise in an easy-to-understand format.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}