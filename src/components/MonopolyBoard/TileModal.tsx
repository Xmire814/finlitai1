import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, Award, Clock, Target } from 'lucide-react';
import { FinanceCategory } from '../../types';

interface BoardTile {
  id: string;
  position: number;
  type: 'start' | 'lesson' | 'quiz' | 'board-quiz' | 'activity';
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  icon: string;
  color: string;
}

interface TileModalProps {
  tile: BoardTile;
  category: FinanceCategory;
  onClose: () => void;
}

export default function TileModal({ tile, category, onClose }: TileModalProps) {
  const getCategoryColor = () => {
    switch (category) {
      case 'spending': return 'from-red-500 to-pink-600';
      case 'investing': return 'from-green-500 to-emerald-600';
      case 'saving': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTileTypeInfo = () => {
    switch (tile.type) {
      case 'start':
        return {
          name: 'Start Tile',
          description: 'Begin your learning journey and earn bonus XP',
          estimatedTime: '1 min',
          difficulty: 'Easy'
        };
      case 'lesson':
        return {
          name: 'Lesson',
          description: 'Learn new concepts and practical skills',
          estimatedTime: '10-15 min',
          difficulty: 'Medium'
        };
      case 'quiz':
        return {
          name: 'Knowledge Quiz',
          description: 'Test your understanding of recent lessons',
          estimatedTime: '5-8 min',
          difficulty: 'Medium'
        };
      case 'board-quiz':
        return {
          name: 'Comprehensive Quiz',
          description: 'Master-level test covering all previous content',
          estimatedTime: '15-20 min',
          difficulty: 'Hard'
        };
      case 'activity':
        return {
          name: 'Interactive Activity',
          description: 'Apply your knowledge in real-world scenarios',
          estimatedTime: '8-12 min',
          difficulty: 'Medium'
        };
      default:
        return {
          name: 'Learning Module',
          description: 'Educational content',
          estimatedTime: '10 min',
          difficulty: 'Medium'
        };
    }
  };

  const typeInfo = getTileTypeInfo();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${getCategoryColor()} text-white p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-white/20 p-4 rounded-full text-3xl">
              {tile.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{tile.title}</h2>
              <p className="text-sm opacity-90">{typeInfo.name}</p>
            </div>
          </div>

          {/* Position indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
              {tile.position + 1}
            </div>
            <span className="text-sm font-medium">Position {tile.position + 1} of 40</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {typeInfo.description}
          </p>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">XP Reward</span>
              </div>
              <span className="font-bold text-green-600">+{tile.xpReward} XP</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Estimated Time</span>
              </div>
              <span className="text-gray-600">{typeInfo.estimatedTime}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Difficulty</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(typeInfo.difficulty)}`}>
                {typeInfo.difficulty}
              </span>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What You'll Accomplish</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {tile.type === 'lesson' && (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Master key concepts and principles</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Learn practical applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Build foundational knowledge</span>
                  </li>
                </>
              )}
              {tile.type === 'quiz' && (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Test your understanding</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Identify knowledge gaps</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Reinforce learning</span>
                  </li>
                </>
              )}
              {tile.type === 'activity' && (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Apply knowledge practically</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Solve real-world scenarios</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Build confidence</span>
                  </li>
                </>
              )}
              {tile.type === 'board-quiz' && (
                <>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Demonstrate mastery</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Comprehensive assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Unlock next level</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!tile.isLocked ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 bg-gradient-to-r ${getCategoryColor()} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
              >
                <Play className="h-4 w-4" />
                <span>{tile.isCompleted ? 'Review' : 'Start'}</span>
              </motion.button>
            ) : (
              <div className="flex-1 bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
                <span>🔒 Complete previous tiles to unlock</span>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}