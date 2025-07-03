import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Lock, CheckCircle, Star } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { FinanceCategory } from '../types';
import Header from '../components/Layout/Header';

const categoryInfo = {
  budgeting: {
    title: 'Budgeting Mastery',
    description: 'Learn to create and maintain budgets that work for your lifestyle',
    color: 'bg-green-500',
    icon: '📊'
  },
  saving: {
    title: 'Smart Saving',
    description: 'Build emergency funds and save effectively for your goals',
    color: 'bg-blue-500',
    icon: '🏦'
  },
  investing: {
    title: 'Investment Fundamentals',
    description: 'Grow your wealth through smart investment strategies',
    color: 'bg-purple-500',
    icon: '📈'
  },
  credit: {
    title: 'Credit Management',
    description: 'Master credit scores, cards, and borrowing responsibly',
    color: 'bg-red-500',
    icon: '💳'
  },
  taxes: {
    title: 'Tax Planning',
    description: 'Understand taxes and maximize your deductions',
    color: 'bg-yellow-500',
    icon: '📋'
  },
  insurance: {
    title: 'Insurance Essentials',
    description: 'Protect yourself and your assets with proper coverage',
    color: 'bg-indigo-500',
    icon: '🛡️'
  }
};

export default function CategoryPage() {
  const { category } = useParams<{ category: FinanceCategory }>();
  const { getLessonsByCategory } = useGame();

  if (!category || !(category in categoryInfo)) {
    return <div>Category not found</div>;
  }

  const lessons = getLessonsByCategory(category);
  const info = categoryInfo[category];
  const completedCount = lessons.filter(l => l.isCompleted).length;
  const availableCount = lessons.filter(l => !l.isLocked).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Category Header */}
      <div className={`${info.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-6"
          >
            <div className="text-6xl">{info.icon}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{info.title}</h1>
              <p className="text-xl opacity-90 mb-4">{info.description}</p>
              <div className="flex items-center space-x-6 text-sm">
                <span>{completedCount}/{lessons.length} lessons completed</span>
                <span>{availableCount} lessons available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                bg-white rounded-xl shadow-lg border-2 overflow-hidden
                ${lesson.isCompleted 
                  ? 'border-green-200 bg-green-50' 
                  : lesson.isLocked 
                  ? 'border-gray-200 bg-gray-50 opacity-60' 
                  : 'border-primary-200 hover:border-primary-300 hover:shadow-xl'
                }
                transition-all duration-200
              `}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      ${lesson.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : lesson.isLocked 
                        ? 'bg-gray-300 text-gray-600' 
                        : 'bg-primary-500 text-white'
                      }
                    `}>
                      {index + 1}
                    </div>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.ceil(lesson.difficulty === 'beginner' ? 1 : lesson.difficulty === 'intermediate' ? 3 : 5)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {lesson.isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : lesson.isLocked ? (
                      <Lock className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Play className="h-5 w-5 text-primary-500" />
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {lesson.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {lesson.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                      {lesson.difficulty}
                    </span>
                    <span>+{lesson.xpReward} XP</span>
                  </div>
                  
                  {!lesson.isLocked && (
                    <Link
                      to={`/lesson/${lesson.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      {lesson.isCompleted ? 'Review' : 'Start'}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}