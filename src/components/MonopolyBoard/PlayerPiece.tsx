import React from 'react';
import { motion } from 'framer-motion';
import { FinanceCategory } from '../../types';

interface PlayerPieceProps {
  position: number;
  category: FinanceCategory;
  totalTiles: number;
  isMoving?: boolean;
}

export default function PlayerPiece({ position, category, totalTiles, isMoving = false }: PlayerPieceProps) {
  const getPositionCoordinates = (pos: number) => {
    const boardSize = 900;
    const tileSize = 70;
    const cornerOffset = 80;
    const padding = 20;
    
    // Bottom row: positions 0-8 (tiles 1-9)
    if (pos <= 8) {
      const x = padding + cornerOffset + (pos * (boardSize - 2 * padding - 2 * cornerOffset) / 8) + (tileSize / 2);
      return { x, y: boardSize - padding - (tileSize / 2) };
    }
    // Bottom right corner: position 9 (tile 10)
    else if (pos === 9) {
      return { x: boardSize - padding - (tileSize / 2), y: boardSize - padding - (tileSize / 2) };
    }
    // Right column: positions 10-18 (tiles 11-19)
    else if (pos <= 18) {
      const tileIndex = pos - 10;
      const y = boardSize - padding - cornerOffset - (tileIndex * (boardSize - 2 * padding - 2 * cornerOffset) / 8) - (tileSize / 2);
      return { x: boardSize - padding - (tileSize / 2), y };
    }
    // Top right corner: position 19 (tile 20)
    else if (pos === 19) {
      return { x: boardSize - padding - (tileSize / 2), y: padding + (tileSize / 2) };
    }
    // Top row: positions 20-29 (tiles 21-30)
    else if (pos <= 29) {
      const tileIndex = 29 - pos; // Reverse order for top row
      const x = boardSize - padding - cornerOffset - (tileIndex * (boardSize - 2 * padding - 2 * cornerOffset) / 9) - (tileSize / 2);
      return { x, y: padding + (tileSize / 2) };
    }
    // Top left corner: position 30 (tile 31)
    else if (pos === 30) {
      return { x: padding + (tileSize / 2), y: padding + (tileSize / 2) };
    }
    // Left column: positions 31-39 (tiles 32-40)
    else {
      const tileIndex = 39 - pos; // Reverse order for left column
      const y = padding + cornerOffset + (tileIndex * (boardSize - 2 * padding - 2 * cornerOffset) / 8) + (tileSize / 2);
      return { x: padding + (tileSize / 2), y };
    }
  };

  const coords = getPositionCoordinates(position);

  const getPlayerIcon = (category: FinanceCategory) => {
    switch (category) {
      case 'spending': return '🛒';
      case 'investing': return '💎';
      case 'saving': return '🏛️';
      default: return '👤';
    }
  };

  const getCategoryColor = (category: FinanceCategory) => {
    switch (category) {
      case 'spending': return 'from-red-400 to-pink-500';
      case 'investing': return 'from-green-400 to-emerald-500';
      case 'saving': return 'from-blue-400 to-cyan-500';
      default: return 'from-yellow-400 to-orange-500';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1,
        rotate: 0,
        x: coords.x,
        y: coords.y
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 25,
        duration: isMoving ? 1.5 : 1.2 
      }}
      className="absolute w-14 h-14 z-30"
      style={{
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div
        animate={isMoving ? { 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        } : { 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: isMoving ? 0.5 : 3, 
          repeat: isMoving ? 3 : Infinity,
          repeatType: "reverse"
        }}
        className={`w-full h-full bg-gradient-to-br ${getCategoryColor(category)} rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-xl relative overflow-hidden`}
      >
        {/* Animated background shimmer */}
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        
        {/* Player icon */}
        <span className="relative z-10 drop-shadow-lg text-lg">
          {getPlayerIcon(category)}
        </span>

        {/* Inner glow */}
        <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
      </motion.div>
      
      {/* Outer glow effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category)} rounded-full blur-lg -z-10`}
      />

      {/* Position indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap font-semibold"
      >
        Position {position + 1}
      </motion.div>

      {/* Movement trail effect */}
      {isMoving && (
        <motion.div
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category)} rounded-full -z-20`}
        />
      )}
    </motion.div>
  );
}