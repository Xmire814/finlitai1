import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Award, TrendingUp, Heart, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import Header from '../components/Layout/Header';

export default function ProfilePage() {
  const { user } = useAuth();
  const { gameState } = useGame();

  if (!user) return null;

  const achievements = [
    { name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', unlocked: true },
    { name: 'Budget Master', description: 'Complete all budgeting lessons', icon: '📊', unlocked: false },
    { name: 'Streak Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: false },
    { name: 'XP Champion', description: 'Earn 1000 XP', icon: '⭐', unlocked: false },
  ];

  const stats = [
    { label: 'Current Level', value: gameState.level, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Total XP', value: gameState.xp, icon: Award, color: 'text-yellow-600' },
    { label: 'Day Streak', value: gameState.streak, icon: Flame, color: 'text-orange-600' },
    { label: 'Hearts', value: `${gameState.currentHearts}/${gameState.maxHearts}`, icon: Heart, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="bg-primary-100 p-6 rounded-full">
              <User className="h-12 w-12 text-primary-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  Level {gameState.level} Learner
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Level Progress</span>
                <span>{gameState.xp % 1000}/1000 XP to next level</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(gameState.xp % 1000) / 10}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-primary-600 h-3 rounded-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {user.totalLessonsCompleted}
                </div>
                <div className="text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-1">
                  {Math.floor((user.totalLessonsCompleted / 300) * 100)}%
                </div>
                <div className="text-gray-600">Overall Progress</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`
                  p-4 rounded-xl border-2 transition-all
                  ${achievement.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <Award className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}