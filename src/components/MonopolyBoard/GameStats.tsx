import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { FinanceCategory } from '../../types';

interface GameStatsProps {
  category: FinanceCategory;
}

export default function GameStats({ category }: GameStatsProps) {
  const { gameState, getBoardByCategory } = useGame();
  const tiles = getBoardByCategory(category);
  const playerPosition = gameState.playerPosition[category] || 0;
  const completedLessons = tiles.filter(t => t.isCompleted).length;
  const progressPercentage = (completedLessons / 40) * 100;

  return (
    <div className="flex items-center space-x-6 text-white">
      {/* Position */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[80px]"
      >
        <Target className="h-5 w-5 mx-auto mb-1" />
        <div className="text-lg font-bold">{playerPosition + 1}</div>
        <div className="text-xs opacity-90">Position</div>
      </motion.div>

      {/* Completed */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[80px]"
      >
        <Trophy className="h-5 w-5 mx-auto mb-1" />
        <div className="text-lg font-bold">{completedLessons}</div>
        <div className="text-xs opacity-90">Complete</div>
      </motion.div>

      {/* Progress */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[80px]"
      >
        <TrendingUp className="h-5 w-5 mx-auto mb-1" />
        <div className="text-lg font-bold">{Math.round(progressPercentage)}%</div>
        <div className="text-xs opacity-90">Progress</div>
      </motion.div>

      {/* Level */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center min-w-[80px]"
      >
        <Zap className="h-5 w-5 mx-auto mb-1" />
        <div className="text-lg font-bold">{Math.floor(playerPosition / 10) + 1}</div>
        <div className="text-xs opacity-90">Level</div>
      </motion.div>
    </div>
  );
}