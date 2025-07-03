import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, BookOpen, Award, Clock, Users } from 'lucide-react';
import { BoardTile, FinanceCategory } from '../../types';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  tile: BoardTile;
  category: FinanceCategory;
  onClose: () => void;
  onLessonComplete?: (lessonId: string) => void;
}

export default function PropertyCard({ tile, category, onClose, onLessonComplete }: PropertyCardProps) {
  const getCategoryColor = (category: FinanceCategory) => {
    switch (category) {
      case 'spending': return 'from-red-500 to-pink-600';
      case 'investing': return 'from-green-500 to-emerald-600';
      case 'saving': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstimatedTime = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '5-10 min';
      case 'intermediate': return '10-15 min';
      case 'advanced': return '15-20 min';
      default: return '10 min';
    }
  };

  const handleStartLesson = () => {
    if (tile.lesson && onLessonComplete) {
      // Simulate lesson completion for demo purposes
      setTimeout(() => {
        onLessonComplete(tile.lesson!.id);
      }, 2000);
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
        <div className={`bg-gradient-to-r ${getCategoryColor(category)} text-white p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{tile.title}</h2>
              <p className="text-sm opacity-90">Position {tile.position + 1} on the board</p>
            </div>
          </div>

          {/* Property Group Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full"></div>
            <span className="text-sm font-medium capitalize">{category} Mastery</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {tile.description || tile.lesson?.description || 'Master essential financial skills through this interactive lesson.'}
          </p>

          {/* Lesson Details */}
          {tile.lesson && (
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">XP Reward</span>
                </div>
                <span className="font-bold text-green-600">+{tile.lesson.xpReward} XP</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Estimated Time</span>
                </div>
                <span className="text-gray-600">{getEstimatedTime(tile.lesson.difficulty)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">Difficulty</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyColor(tile.lesson.difficulty)}`}>
                  {tile.lesson.difficulty}
                </span>
              </div>
            </div>
          )}

          {/* Learning Objectives */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Core concepts and practical applications</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Real-world examples and case studies</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Actionable strategies you can implement today</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Knowledge check to reinforce learning</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {tile.lesson && !tile.isLocked ? (
              <div className="flex-1 space-y-2">
                <Link
                  to={`/lesson/${tile.lesson.id}`}
                  className={`w-full bg-gradient-to-r ${getCategoryColor(category)} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                >
                  <Play className="h-4 w-4" />
                  <span>{tile.isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                </Link>
                
                {/* Quick Complete Button for Demo */}
                {!tile.isCompleted && onLessonComplete && (
                  <button
                    onClick={handleStartLesson}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                  >
                    Quick Complete (Demo)
                  </button>
                )}
              </div>
            ) : (
              <div className="flex-1 bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2">
                <span>🔒 Complete previous lessons to unlock</span>
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