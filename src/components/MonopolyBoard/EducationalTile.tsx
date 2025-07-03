import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Star } from 'lucide-react';

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

interface EducationalTileProps {
  tile: BoardTile;
  isPlayerHere: boolean;
  position: 'top' | 'right' | 'bottom' | 'left';
  onTileClick: () => void;
}

export default function EducationalTile({ tile, isPlayerHere, position, onTileClick }: EducationalTileProps) {
  const getRotationClass = () => {
    switch (position) {
      case 'top': return 'rotate-180';
      case 'right': return '-rotate-90';
      case 'left': return 'rotate-90';
      default: return '';
    }
  };

  const getTileSize = () => {
    return 'w-16 h-16';
  };

  const getTileColor = () => {
    if (tile.isCompleted) {
      return 'bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-700 shadow-lg';
    }
    if (tile.isLocked) {
      return 'bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-gray-600 shadow-sm';
    }
    return `${tile.color} border-2 border-opacity-70 shadow-md hover:shadow-lg`;
  };

  const isClickable = !tile.isLocked;

  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.05, y: -2 } : { scale: 1.02 }}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      onClick={isClickable ? onTileClick : undefined}
      className={`
        ${getTileSize()} ${getTileColor()} rounded-lg
        flex flex-col items-center justify-center p-1 text-center relative overflow-hidden
        ${getRotationClass()}
        ${isPlayerHere ? 'ring-4 ring-yellow-400 ring-opacity-90 shadow-2xl' : ''}
        ${isClickable ? 'hover:shadow-lg cursor-pointer transform transition-all duration-200' : 'transition-all duration-200'}
        m-1
      `}
    >
      {/* Tile Number */}
      <div className="absolute top-0.5 left-0.5 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center leading-none">
        {tile.position + 1}
      </div>

      {/* Main Icon */}
      <div className={`
        text-2xl mb-1
        ${tile.isCompleted ? 'text-white' : 
          tile.isLocked ? 'text-gray-600' : 
          'text-white'}
      `}>
        {tile.icon}
      </div>

      {/* Player indicator */}
      {isPlayerHere && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ 
            scale: { duration: 0.3 },
            rotate: { duration: 2, repeat: Infinity }
          }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center shadow-xl z-20"
        >
          <span className="text-sm">👤</span>
        </motion.div>
      )}

      {/* Available indicator */}
      {!tile.isLocked && !tile.isCompleted && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border border-white shadow-md"
        >
        </motion.div>
      )}
    </motion.div>
  );
}