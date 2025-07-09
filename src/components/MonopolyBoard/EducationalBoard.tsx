import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FinanceCategory } from '../../types';
import EducationalTile from './EducationalTile';
import TileModal from './TileModal';

interface EducationalBoardProps {
  category: FinanceCategory;
}

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

export default function EducationalBoard({ category }: EducationalBoardProps) {
  const [selectedTile, setSelectedTile] = useState<BoardTile | null>(null);
  const [playerPosition] = useState(0);

  // Generate 50 tiles following the specified pattern
  const generateBoardTiles = (): BoardTile[] => {
    const tiles: BoardTile[] = [];

    // Create 40 tiles total (10 per side)
    for (let i = 1; i <= 40; i++) {
      let type: 'lesson' | 'quiz' | 'board-quiz' | 'activity' = 'lesson';
      let icon = '📚';
      let color = 'bg-blue-500';
      let xpReward = 50;
      let title = `Lesson ${i}`;
      let description = 'Learn essential financial concepts';

      // Special tiles at specific positions
      if (i % 5 === 0) {
        // Every 5th tile is a quiz
        type = 'quiz';
        icon = '❓';
        color = 'bg-orange-500';
        xpReward = 75;
        title = `Quiz ${Math.ceil(i / 5)}`;
        description = 'Test your knowledge';
      } else if (i % 10 === 0) {
        // Every 10th tile is a board quiz
        type = 'board-quiz';
        icon = '🏆';
        color = 'bg-red-500';
        xpReward = 150;
        title = `Mastery Test ${i / 10}`;
        description = 'Comprehensive assessment';
      } else if (i % 7 === 0) {
        // Every 7th tile is an activity
        type = 'activity';
        icon = '🎯';
        color = 'bg-purple-500';
        xpReward = 100;
        title = `Challenge ${Math.ceil(i / 7)}`;
        description = 'Interactive scenario';
      }

      // Special case for lesson 40 (final lesson)
      if (i === 40) {
        icon = '🎓';
        title = 'Master Lesson';
        description = 'Complete your mastery journey';
        xpReward = 200;
      }

      tiles.push({
        id: `tile-${i}`,
        position: i - 1,
        type,
        title,
        description,
        xpReward,
        isCompleted: i <= playerPosition + 1,
        isLocked: i > playerPosition + 2,
        icon,
        color
      });
    }

    return tiles;
  };

  const tiles = generateBoardTiles();

  // Arrange tiles around the board (10 tiles per side)
  const bottomRow = tiles.slice(0, 10);        // Tiles 1-10
  const rightColumn = tiles.slice(10, 20);     // Tiles 11-20
  const topRow = tiles.slice(20, 30).reverse(); // Tiles 21-30 (reversed for proper display)
  const leftColumn = tiles.slice(30, 40).reverse(); // Tiles 31-40 (reversed for proper display)

  const getCategoryColor = () => {
    switch (category) {
      case 'spending': return 'from-red-500 to-pink-600';
      case 'investing': return 'from-green-500 to-emerald-600';
      case 'saving': return 'from-blue-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'spending': return '💳';
      case 'investing': return '📈';
      case 'saving': return '🏦';
      default: return '💰';
    }
  };

  const handleTileClick = (tile: BoardTile) => {
    if (!tile.isLocked) {
      setSelectedTile(tile);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Board Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${getCategoryColor()} text-white rounded-2xl p-6 mb-8 shadow-2xl`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getCategoryIcon()}</span>
            <div>
              <h1 className="text-3xl font-bold capitalize">{category} Mastery Board</h1>
              <p className="text-lg opacity-90">Complete all 40 lessons to master {category}!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{playerPosition + 1}/40</div>
            <div className="text-sm opacity-90">Current Position</div>
          </div>
        </div>
      </motion.div>

      {/* Game Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-3xl shadow-2xl border-4 border-emerald-800 p-6"
        style={{ width: '900px', height: '900px', margin: '0 auto' }}
      >
        {/* Center Area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`bg-gradient-to-br ${getCategoryColor()} text-white rounded-full w-64 h-64 flex flex-col items-center justify-center shadow-2xl border-6 border-white`}>
            <span className="text-6xl mb-4">{getCategoryIcon()}</span>
            <h2 className="text-2xl font-bold capitalize mb-2">{category}</h2>
            <p className="text-lg opacity-90 font-semibold">MASTERY BOARD</p>
            <div className="text-sm opacity-80 mt-4 text-center">
              <div className="bg-white/20 rounded-full px-4 py-2 mb-2">
                Position {playerPosition + 1}/40
              </div>
              <div className="text-xs">Click tiles to learn!</div>
            </div>
          </div>
        </div>

        {/* Bottom Row (Tiles 1-10) */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          {bottomRow.map((tile) => (
            <EducationalTile
              key={tile.id}
              tile={tile}
              isPlayerHere={playerPosition === tile.position}
              onTileClick={() => handleTileClick(tile)}
            />
          ))}
        </div>

        {/* Right Column (Tiles 11-20) */}
        <div className="absolute top-6 right-6 bottom-6 flex flex-col justify-between items-end">
          {rightColumn.map((tile) => (
            <EducationalTile
              key={tile.id}
              tile={tile}
              isPlayerHere={playerPosition === tile.position}
              onTileClick={() => handleTileClick(tile)}
            />
          ))}
        </div>

        {/* Top Row (Tiles 21-30) */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          {topRow.map((tile) => (
            <EducationalTile
              key={tile.id}
              tile={tile}
              isPlayerHere={playerPosition === tile.position}
              onTileClick={() => handleTileClick(tile)}
            />
          ))}
        </div>

        {/* Left Column (Tiles 31-40) */}
        <div className="absolute top-6 left-6 bottom-6 flex flex-col justify-between items-start">
          {leftColumn.map((tile) => (
            <EducationalTile
              key={tile.id}
              tile={tile}
              isPlayerHere={playerPosition === tile.position}
              onTileClick={() => handleTileClick(tile)}
            />
          ))}
        </div>

        {/* Player Token */}
        <motion.div
          animate={{
            x: getPlayerPosition(playerPosition).x,
            y: getPlayerPosition(playerPosition).y
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="absolute w-6 h-6 z-30"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor()} rounded-full shadow-2xl border-4 border-white flex items-center justify-center text-lg relative`}>
            <span className="text-xs drop-shadow-lg">👤</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Progress Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {tiles.filter(t => t.isCompleted).length}
          </div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {tiles.filter(t => !t.isLocked && !t.isCompleted).length}
          </div>
          <div className="text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-gray-600 mb-2">
            {tiles.filter(t => t.isLocked).length}
          </div>
          <div className="text-gray-600">Locked</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {tiles.reduce((sum, t) => sum + (t.isCompleted ? t.xpReward : 0), 0)}
          </div>
          <div className="text-gray-600">XP Earned</div>
        </div>
      </motion.div>

      {/* Tile Modal */}
      <AnimatePresence>
        {selectedTile && (
          <TileModal
            tile={selectedTile}
            category={category}
            onClose={() => setSelectedTile(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to calculate player position coordinates
function getPlayerPosition(position: number) {
  const boardSize = 900;
  const padding = 60;
  
  if (position <= 9) {
    // Bottom row (positions 0-9, tiles 1-10)
    const x = padding + (position * (boardSize - 2 * padding - 60) / 9) + 30;
    return { x, y: boardSize - padding };
  } else if (position <= 19) {
    // Right column (positions 10-19, tiles 11-20)
    const y = boardSize - padding - ((position - 10) * (boardSize - 2 * padding - 60) / 9) - 30;
    return { x: boardSize - padding, y };
  } else if (position <= 29) {
    // Top row (positions 20-29, tiles 21-30)
    const x = boardSize - padding - ((position - 20) * (boardSize - 2 * padding - 60) / 9) - 30;
    return { x, y: padding };
  } else {
    // Left column (positions 30-39, tiles 31-40)
    const y = padding + ((position - 30) * (boardSize - 2 * padding - 60) / 9) + 30;
    return { x: padding, y };
  }
}