import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, DollarSign, TrendingUp, PiggyBank, CreditCard, Home, ClipboardCopy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';

// --- Helper: Toast Notification Component ---
// For a better user experience, you can replace the default `alert()` with a custom toast notification.
// This is a simple example. You can use a library like 'react-toastify' for more advanced features.
function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-5 right-5 bg-gray-900 text-white py-2 px-4 rounded-lg shadow-lg">
      {message}
    </div>
  );
}


// --- Data: Quick Prompts (Unchanged) ---
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


// --- Main Component: AIBotPage ---
export default function AIBotPage() {
  const [toast, setToast] = React.useState({ show: false, message: '' });

  // This function copies the selected prompt to the clipboard and shows a confirmation toast.
  const handleQuickPromptClick = (prompt) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setToast({ show: true, message: 'Copied to clipboard!' });
      setTimeout(() => setToast({ show: false, message: '' }), 2000); // Hide toast after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert("Failed to copy prompt. Please copy it manually.");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Prompts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Start Topics
              </h3>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickPromptClick(prompt.prompt)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="text-purple-600">{prompt.icon}</div>
                            <div>
                                <div className="font-medium text-gray-900 text-sm">{prompt.title}</div>
                            </div>
                        </div>
                        <ClipboardCopy className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 pl-8">
                        Click to copy this prompt
                    </p>
                  </motion.button>
                ))}
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
            {/* We replace the script-based embed with a simple, robust iframe.
              The chatbot ID from your original code is used in the src URL.
              The iframe is styled to fit perfectly within the container.
            */}
            <div className="bg-white rounded-2xl shadow-xl h-[700px] w-full overflow-hidden">
                <iframe
                    src="https://www.chatbase.co/chatbot-iframe/CTWS47NM3u2POJw7dQqID"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                />
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">
                Click a Quick Start Topic to copy a prompt, then paste it into the chat window.
            </p>
          </motion.div>
        </div>
      </div>
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}