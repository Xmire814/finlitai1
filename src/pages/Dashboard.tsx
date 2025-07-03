import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import Header from '../components/Layout/Header';
import GameBoard from '../components/GameBoard/GameBoard';
import ChatBot from '../components/ChatBot/ChatBot';

export default function Dashboard() {
  const { user } = useAuth();
  const { gameState } = useGame();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-lg opacity-90">
                Ready to continue mastering your financial future?
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="text-2xl font-bold text-gray-900 mb-1">
                Level {gameState.level}
              </div>
              <div className="text-sm text-gray-600">Current Level</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="text-2xl font-bold text-secondary-600 mb-1">
                {gameState.xp}
              </div>
              <div className="text-sm text-gray-600">Total XP</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {gameState.streak}
              </div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {user?.totalLessonsCompleted || 0}
              </div>
              <div className="text-sm text-gray-600">Lessons Complete</div>
            </motion.div>
          </div>
        </div>

        {/* Game Board */}
        <GameBoard />
      </main>

      {/* AI Chat Bot */}
      <ChatBot />
    </div>
  );
}