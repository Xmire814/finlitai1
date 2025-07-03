import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import Header from '../components/Layout/Header';
import GameBoard from '../components/GameBoard/GameBoard';
import ChatBot from '../components/ChatBot/ChatBot';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import ErrorBoundary from '../components/Layout/ErrorBoundary';

export default function Dashboard() {
  const { user } = useAuth();
  const { gameState, loading, error, refreshData } = useGame();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner message="Loading your financial journey..." size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Content</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={refreshData}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}