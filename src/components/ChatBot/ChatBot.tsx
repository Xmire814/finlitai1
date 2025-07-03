import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Brain } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatbaseLoaded, setChatbaseLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !chatbaseLoaded) {
      // Initialize Chatbase when chat is opened
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
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

      const onLoad = function() {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "7L5ZdrsoimOiFoutv6cMR-floating";
        script.setAttribute("data-domain", "www.chatbase.co");
        document.body.appendChild(script);
        setChatbaseLoaded(true);
      };

      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    }

    // Cleanup function
    return () => {
      if (!isOpen) {
        const existingScript = document.getElementById("7L5ZdrsoimOiFoutv6cMR-floating");
        if (existingScript) {
          existingScript.remove();
          setChatbaseLoaded(false);
        }
      }
    };
  }, [isOpen, chatbaseLoaded]);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-2xl flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">FINLIT AI Coach</h3>
                <p className="text-sm opacity-90">Your personal financial mentor</p>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 flex items-center justify-center">
              {!chatbaseLoaded ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-3"
                  />
                  <p className="text-gray-600 text-sm">Loading AI coach...</p>
                </div>
              ) : (
                <div className="w-full h-full">
                  {/* Chatbase will inject content here */}
                  <div className="text-center text-gray-600 text-sm">
                    Chat interface will appear here
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-3 text-center">
              <p className="text-xs text-gray-500">
                💡 Ask me about budgeting, investing, saving, or any financial question!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}