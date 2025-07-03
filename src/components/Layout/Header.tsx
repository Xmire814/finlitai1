import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Flame, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';

export default function Header() {
  const { user, signOut } = useAuth();
  const { gameState } = useGame();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg border-b-2 border-primary-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side: Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Bolt Logo */}
            <motion.a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <img  
                src="/black_circle_360x360.png"  
                alt="Bolt.new"  
                className="h-10 w-10 rounded-full hover:shadow-lg transition-shadow"
              />
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/dashboard"
                className="text-lg font-semibold text-gray-700 hover:text-primary-600 transition-colors"
              >
                FinLessons
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ai-bot"
                className="text-lg font-semibold text-gray-700 hover:text-primary-600 transition-colors"
              >
                FinLit AI
              </Link>
            </motion.div>
          </div>

          {/* Right Side User Info & Stats */}
          <div className="flex items-center space-x-6">
            {/* Hearts */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 bg-red-100 px-3 py-2 rounded-full"
            >
              <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
              <span className="text-sm font-medium text-red-700">
                {gameState.currentHearts}/{gameState.maxHearts}
              </span>
            </motion.div>

            {/* Streak */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 bg-orange-100 px-3 py-2 rounded-full"
            >
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">
                {gameState.streak}
              </span>
            </motion.div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}