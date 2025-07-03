import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import EducationalBoard from '../components/MonopolyBoard/EducationalBoard';
import ChatBot from '../components/ChatBot/ChatBot';

export default function SpendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 mb-6 transition-colors"
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
            Smart Spending Mastery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn to make conscious spending decisions, avoid common money traps, and align your purchases with your values and goals.
          </p>
        </motion.div>

        <EducationalBoard category="spending" />
      </div>

      <ChatBot />
    </div>
  );
}