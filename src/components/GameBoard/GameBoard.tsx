import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, PiggyBank, CreditCard, CheckCircle, Lock, Star, Target } from 'lucide-react';
import { useGame } from '../../context/GameContext';

const categories = [
  { 
    name: 'spending', 
    color: 'bg-gradient-to-br from-red-500 to-pink-600', 
    icon: CreditCard,
    title: 'Smart Spending',
    description: 'Master conscious spending and avoid money traps',
    path: '/spending'
  },
  { 
    name: 'investing', 
    color: 'bg-gradient-to-br from-green-500 to-emerald-600', 
    icon: TrendingUp,
    title: 'Investment Mastery',
    description: 'Build wealth through smart investment strategies',
    path: '/investing'
  },
  { 
    name: 'saving', 
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600', 
    icon: PiggyBank,
    title: 'Saving Excellence',
    description: 'Build emergency funds and maximize savings',
    path: '/saving'
  },
];

export default function GameBoard() {
  const { lessons, gameState } = useGame();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Financial Mastery Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master essential money skills through our AI-powered learning experience. 
          Complete lessons, earn XP, and unlock your financial potential!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const categoryLessons = lessons.filter(l => l.category === category.name);
          const completedLessons = categoryLessons.filter(l => l.isCompleted).length;
          const availableLessons = categoryLessons.filter(l => !l.isLocked).length;
          const lockedLessons = categoryLessons.filter(l => l.isLocked).length;
          const progressPercentage = (completedLessons / categoryLessons.length) * 100;
          const playerPosition = gameState.playerPosition[category.name] || 0;

          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Header */}
              <div className={`${category.color} p-6 text-white`}>
                <div className="flex items-center space-x-3 mb-4">
                  <category.icon className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      className="bg-white h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Enhanced Board Preview with Real Data */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Learning Path</h4>
                    <div className="text-sm text-gray-600">
                      {completedLessons}/{categoryLessons.length} completed
                    </div>
                  </div>
                  
                  {/* Enhanced Grid with Real Lesson Data */}
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {categoryLessons.slice(0, 10).map((lesson, i) => {
                      // Get lesson-specific icon based on lesson title and category
                      const getLessonIcon = () => {
                        const title = lesson.title.toLowerCase();
                        
                        if (category.name === 'spending') {
                          if (title.includes('budget')) return '📊';
                          if (title.includes('needs') || title.includes('wants')) return '🤔';
                          if (title.includes('shopping')) return '🛒';
                          if (title.includes('subscription')) return '📱';
                          if (title.includes('meal') || title.includes('food')) return '🍽️';
                          if (title.includes('transportation')) return '🚗';
                          if (title.includes('housing')) return '🏠';
                          if (title.includes('insurance')) return '🛡️';
                          if (title.includes('utility')) return '💡';
                          if (title.includes('entertainment')) return '🎬';
                          return '💳';
                        }
                        
                        if (category.name === 'investing') {
                          if (title.includes('basics') || title.includes('investment')) return '📈';
                          if (title.includes('stock')) return '📊';
                          if (title.includes('index') || title.includes('funds')) return '📋';
                          if (title.includes('risk')) return '⚖️';
                          if (title.includes('dollar') || title.includes('averaging')) return '💰';
                          if (title.includes('retirement') || title.includes('401k') || title.includes('ira')) return '🏦';
                          if (title.includes('compound')) return '🔄';
                          if (title.includes('allocation')) return '🎯';
                          if (title.includes('real estate')) return '🏘️';
                          if (title.includes('bond')) return '📜';
                          return '💎';
                        }
                        
                        if (category.name === 'saving') {
                          if (title.includes('goals')) return '🎯';
                          if (title.includes('high-yield') || title.includes('account')) return '🏦';
                          if (title.includes('automatic')) return '🤖';
                          if (title.includes('emergency')) return '🚨';
                          if (title.includes('vacation')) return '✈️';
                          if (title.includes('down payment') || title.includes('home')) return '🏠';
                          if (title.includes('sinking')) return '💧';
                          if (title.includes('cd') || title.includes('certificate')) return '📜';
                          if (title.includes('money market')) return '💹';
                          if (title.includes('challenge')) return '🏆';
                          return '💰';
                        }
                        
                        return '📚';
                      };
                      
                      return (
                      <div
                        key={lesson.id}
                        className={`
                          aspect-square rounded-xl flex flex-col items-center justify-center text-xs relative
                          transition-all duration-200 hover:scale-105 cursor-pointer shadow-md hover:shadow-lg
                          ${lesson.isCompleted
                            ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg border-2 border-green-300'
                            : lesson.isLocked
                            ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-600 border-2 border-gray-300'
                            : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md hover:shadow-lg border-2 border-blue-300'
                          }
                        `}
                        title={`${lesson.title} - ${lesson.isCompleted ? 'Completed' : lesson.isLocked ? 'Locked' : 'Available'}`}
                      >
                        {/* Lesson Icon */}
                        <div className="text-lg mb-1">
                          {getLessonIcon()}
                        </div>
                        
                        {/* Status Icon */}
                        <div className="absolute top-1 right-1">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-3 w-3 text-white" />
                          ) : lesson.isLocked ? (
                            <Lock className="h-3 w-3 text-gray-600" />
                          ) : (
                            <Play className="h-3 w-3 text-white" />
                          )}
                        </div>
                        
                        {/* Lesson number indicator */}
                        <div className="absolute -top-2 -left-2 bg-white text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md border border-gray-200">
                          {i + 1}
                        </div>
                        
                        {/* Current position indicator */}
                        {i === playerPosition && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-600"
                          />
                        )}
                      </div>
                    )})}
                  </div>
                  
                  {/* Progress Indicators */}
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-800">{completedLessons}</span>
                      </div>
                      <div className="text-green-700 text-xs">Completed</div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Play className="h-4 w-4 text-blue-600" />
                        <span className="font-bold text-blue-800">{availableLessons - completedLessons}</span>
                      </div>
                      <div className="text-blue-700 text-xs">Available</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Lock className="h-4 w-4 text-gray-600" />
                        <span className="font-bold text-gray-800">{lockedLessons}</span>
                      </div>
                      <div className="text-gray-700 text-xs">Locked</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 rounded-xl p-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Target className="h-5 w-5 text-primary-600" />
                      <div className="text-2xl font-bold text-primary-600">{playerPosition + 1}</div>
                    </div>
                    <div className="text-sm text-gray-600">Current Position</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <div className="text-2xl font-bold text-yellow-600">{Math.round(progressPercentage)}%</div>
                    </div>
                    <div className="text-sm text-gray-600">Mastery Level</div>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={category.path}
                  className={`
                    w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
                    ${category.color} text-white font-semibold hover:opacity-90 transition-opacity
                  `}
                >
                  <Play className="h-4 w-4" />
                  <span>Continue Journey</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}