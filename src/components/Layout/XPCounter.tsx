import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, TrendingUp } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function XPCounter() {
  const { gameState } = useGame();
  
  const currentLevelXP = gameState.xp % 1000;
  const progressPercentage = (currentLevelXP / 1000) * 100;
  const xpToNextLevel = 1000 - currentLevelXP;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-4 shadow-lg border-2 border-yellow-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-yellow-200" />
          <span className="font-bold text-lg">Level {gameState.level}</span>
        </div>
        <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
          <Zap className="h-4 w-4" />
          <span className="font-semibold">{gameState.xp.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="opacity-90">Progress to Level {gameState.level + 1}</span>
          <span className="opacity-90">{currentLevelXP}/1000 XP</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white h-full rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* XP to Next Level */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1">
          <TrendingUp className="h-4 w-4 opacity-80" />
          <span className="opacity-90">{xpToNextLevel} XP to next level</span>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-white/20 rounded-full px-2 py-1"
        >
          <span className="text-xs font-bold">+{Math.round(progressPercentage)}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}