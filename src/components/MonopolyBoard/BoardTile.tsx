import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, Gift, Users, Star, Zap, Home, Car, Plane, Crown, DollarSign, TrendingUp, Lightbulb, CreditCard, PiggyBank, BookOpen } from 'lucide-react';
import { BoardTile, FinanceCategory } from '../../types';

interface BoardTileProps {
  tile: BoardTile;
  isPlayerHere: boolean;
  category: FinanceCategory;
  position: 'top' | 'right' | 'bottom' | 'left';
  onTileClick?: () => void;
  lessonNumber?: number;
}

export default function BoardTileComponent({ tile, isPlayerHere, category, position, onTileClick, lessonNumber }: BoardTileProps) {
  const getTileIcon = () => {
    switch (tile.type) {
      case 'corner':
        if (tile.position === 0) return <Home className="h-6 w-6" />;
        if (tile.position === 9) return <BookOpen className="h-6 w-6" />;
        if (tile.position === 19) return <Car className="h-6 w-6" />;
        if (tile.position === 30) return <Crown className="h-6 w-6" />;
        return <Star className="h-5 w-5" />;
      case 'chance':
        return <Lightbulb className="h-5 w-5" />;
      case 'community':
        return <Users className="h-5 w-5" />;
      case 'lesson':
        if (category === 'spending') return <CreditCard className="h-5 w-5" />;
        if (category === 'investing') return <TrendingUp className="h-5 w-5" />;
        if (category === 'saving') return <PiggyBank className="h-5 w-5" />;
        return tile.isCompleted ? <CheckCircle className="h-5 w-5" /> : 
               tile.isLocked ? <Lock className="h-5 w-5" /> : <Play className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getTileColor = () => {
    if (tile.type === 'corner') {
      if (tile.position === 0) return 'bg-gradient-to-br from-green-500 to-green-700 border-2 border-green-800 shadow-lg';
      if (tile.position === 9) return 'bg-gradient-to-br from-blue-500 to-blue-700 border-2 border-blue-800 shadow-lg';
      if (tile.position === 19) return 'bg-gradient-to-br from-purple-500 to-purple-700 border-2 border-purple-800 shadow-lg';
      if (tile.position === 30) return 'bg-gradient-to-br from-red-500 to-red-700 border-2 border-red-800 shadow-lg';
    }
    if (tile.type === 'chance') return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-orange-600 shadow-md';
    if (tile.type === 'community') return 'bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-blue-600 shadow-md';
    if (tile.isCompleted) return 'bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-700 shadow-md';
    if (tile.isLocked) return 'bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-gray-600 shadow-sm';

    const colorGroups = {
      spending: 'bg-gradient-to-br from-red-400 to-red-600 border-2 border-red-700 shadow-md',
      investing: 'bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-700 shadow-md',
      saving: 'bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-700 shadow-md'
    };

    return colorGroups[category] || 'bg-gradient-to-br from-white to-gray-100 border-2 border-gray-300 shadow-sm';
  };

  const isCorner = [0, 9, 19, 30].includes(tile.position);

  const getTileSize = () => {
    if (isCorner) return 'w-20 h-20';
    if (position === 'top' || position === 'bottom') return 'w-16 h-20';
    return 'w-20 h-16';
  };

  const getCategoryColorStripe = () => {
    if (tile.type !== 'lesson') return '';
    switch (category) {
      case 'spending': return 'bg-red-600';
      case 'investing': return 'bg-green-600';
      case 'saving': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const isClickable = tile.type === 'lesson' || tile.type === 'chance' || tile.type === 'community';

  return (
    <motion.div
      whileHover={isClickable ? { scale: 1.05, y: -2 } : { scale: 1.02 }}
      whileTap={isClickable ? { scale: 0.95 } : {}}
      onClick={isClickable ? onTileClick : undefined}
      className={`
        ${getTileSize()} ${getTileColor()} rounded-lg
        flex flex-col items-center justify-center p-2 text-center relative overflow-hidden
        ${isPlayerHere ? 'ring-4 ring-yellow-400 ring-opacity-90 shadow-xl' : ''}
        ${isClickable ? 'hover:shadow-lg cursor-pointer transform transition-all duration-200' : 'transition-all duration-200'}
        m-1
      `}
    >
      {tile.type === 'lesson' && (
        <div className={`absolute top-0 left-0 right-0 h-2 ${getCategoryColorStripe()}`} />
      )}
      {tile.type === 'lesson' && lessonNumber && (
        <div className="absolute top-1 left-1 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center leading-none">
          {lessonNumber}
        </div>
      )}

      {isCorner ? (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <div className="mb-2">{getTileIcon()}</div>
          <div className="text-xs font-bold text-center leading-tight">
            {tile.position === 0 && 'START'}
            {tile.position === 9 && 'LEARN'}
            {tile.position === 19 && 'GROW'}
            {tile.position === 30 && 'MASTER'}
          </div>
        </div>
      ) : (
        <>
          <div className={
            `${tile.isCompleted ? 'text-white' : 
              tile.isLocked ? 'text-gray-600' : 
              tile.type === 'chance' || tile.type === 'community' ? 'text-white' :
              'text-white'} mt-2 mb-1`
          } style={{ transform: 'rotate(0deg)', zIndex: 1 }}>
            {getTileIcon()}
          </div>
          {tile.type === 'lesson' && (
            <div className="text-xs font-semibold text-white text-center leading-tight px-1" style={{ zIndex: 1 }}>
              {tile.title.split(' ').slice(0, 2).join(' ')}
            </div>
          )}
        </>
      )}

      {isPlayerHere && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ 
            scale: { duration: 0.3 },
            rotate: { duration: 2, repeat: Infinity }
          }}
          className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg z-20"
        >
          <span className="text-sm">👤</span>
        </motion.div>
      )}

      {tile.isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md"
        >
          <CheckCircle className="h-3 w-3 text-white" />
        </motion.div>
      )}

      {tile.isLocked && tile.type === 'lesson' && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-500 rounded-full border-2 border-white flex items-center justify-center shadow-md"
        >
          <Lock className="h-3 w-3 text-white" />
        </motion.div>
      )}

      {tile.type === 'lesson' && !tile.isLocked && !tile.isCompleted && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"
        />
      )}
    </motion.div>
  );
}