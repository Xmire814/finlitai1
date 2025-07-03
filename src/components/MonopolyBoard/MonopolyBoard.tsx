import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { FinanceCategory, BoardTile } from '../../types';
import BoardTileComponent from './BoardTile';
import PlayerPiece from './PlayerPiece';
import PropertyCard from './PropertyCard';
import ChanceCard from './ChanceCard';
import GameStats from './GameStats';

interface MonopolyBoardProps {
  category: FinanceCategory;
}

export default function MonopolyBoard({ category }: MonopolyBoardProps) {
  const { getBoardByCategory, gameState, movePlayer, completeLesson } = useGame();
  const [showPropertyCard, setShowPropertyCard] = useState<BoardTile | null>(null);
  const [showChanceCard, setShowChanceCard] = useState<any>(null);
  const [gameMessage, setGameMessage] = useState('');

  const tiles = getBoardByCategory(category);
  const playerPosition = gameState.playerPosition[category] || 0;

  const getCategoryColor = (category: FinanceCategory) => {
    switch (category) {
      case 'spending': return 'from-red-500 to-pink-500';
      case 'investing': return 'from-green-500 to-emerald-500';
      case 'saving': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: FinanceCategory) => {
    switch (category) {
      case 'spending': return '💳';
      case 'investing': return '📈';
      case 'saving': return '🏦';
      default: return '💰';
    }
  };

  const handleTileClick = (tile: BoardTile) => {
    if (tile.type === 'lesson' && tile.lesson && !tile.isLocked) {
      setShowPropertyCard(tile);
      setGameMessage(`Ready to learn: ${tile.title}`);
    } else if (tile.type === 'chance') {
      const chanceCard = generateChanceCard(category);
      setShowChanceCard(chanceCard);
      setGameMessage('You drew a Financial Tip card!');
    } else if (tile.type === 'community') {
      const communityCard = generateCommunityCard(category);
      setShowChanceCard(communityCard);
      setGameMessage('Community financial wisdom!');
    } else if (tile.isLocked) {
      setGameMessage('Complete previous lessons to unlock this one!');
    }
  };

  const handleLessonComplete = (lessonId: string) => {
    completeLesson(lessonId);
    setShowPropertyCard(null);
    setGameMessage('Lesson completed! Moving forward on the board.');
  };

  const generateChanceCard = (category: FinanceCategory) => {
    const cards = {
      spending: [
        { title: 'Smart Shopping Tip', content: 'Use the 24-hour rule: Wait a day before making non-essential purchases to avoid impulse buying.', reward: '+50 XP' },
        { title: 'Budget Hack', content: 'Try the envelope method: Allocate cash for different spending categories to stay on track.', reward: '+75 XP' },
        { title: 'Subscription Audit', content: 'Review your subscriptions monthly. Cancel unused services to save $50-200 per month.', reward: '+100 XP' }
      ],
      investing: [
        { title: 'Investment Wisdom', content: 'Time in the market beats timing the market. Start investing early, even with small amounts.', reward: '+50 XP' },
        { title: 'Diversification Tip', content: 'Don\'t put all eggs in one basket. Spread investments across different asset classes.', reward: '+75 XP' },
        { title: 'Compound Interest', content: 'A $1000 investment at 7% annual return becomes $7,612 after 30 years!', reward: '+100 XP' }
      ],
      saving: [
        { title: 'Emergency Fund Goal', content: 'Aim for 3-6 months of expenses in your emergency fund for financial security.', reward: '+50 XP' },
        { title: 'High-Yield Savings', content: 'Move your savings to a high-yield account earning 4%+ instead of 0.01% at big banks.', reward: '+75 XP' },
        { title: 'Automatic Savings', content: 'Set up automatic transfers to savings right after payday - pay yourself first!', reward: '+100 XP' }
      ]
    };
    
    const categoryCards = cards[category];
    return categoryCards[Math.floor(Math.random() * categoryCards.length)];
  };

  const generateCommunityCard = (category: FinanceCategory) => {
    const cards = [
      { title: 'Community Success', content: 'A community member paid off $10,000 in debt using the debt snowball method!', reward: '+25 XP' },
      { title: 'Shared Wisdom', content: 'Community tip: Use cashback credit cards responsibly to earn 1-5% on purchases.', reward: '+30 XP' },
      { title: 'Group Achievement', content: 'The community has collectively saved over $1 million this year!', reward: '+40 XP' }
    ];
    
    return cards[Math.floor(Math.random() * cards.length)];
  };

  // Arrange tiles in EXACT Monopoly board layout as requested:
  // 30 29 28 27 26 25 24 23 22 21 20
  // 31                                19
  // 32                                18
  // 33                                17
  // 34                                16
  // 35                                15
  // 36                                14
  // 37                                13
  // 38                                12
  // 39                                11
  // 40  ------------------------   10
  //  1   2   3   4   5   6   7   8   9

  // Bottom row: positions 1-9 (tiles 0-8)
  const bottomRow = tiles.slice(0, 9);
  // Right column: positions 10-20 (tiles 9-19)
  const rightColumn = tiles.slice(9, 20);
  // Top row: positions 21-30 (tiles 20-29) - reversed for proper display
  const topRow = tiles.slice(20, 30).reverse();
  // Left column: positions 31-40 (tiles 30-39) - reversed for proper display
  const leftColumn = tiles.slice(30, 40).reverse();

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Game Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${getCategoryColor(category)} text-white rounded-2xl p-6 mb-6 shadow-2xl`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getCategoryIcon(category)}</span>
            <div>
              <h1 className="text-3xl font-bold capitalize">{category} Mastery Board</h1>
              <p className="text-lg opacity-90">Complete lessons to advance around the board!</p>
            </div>
          </div>
          <GameStats category={category} />
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* Main Board */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 rounded-2xl shadow-2xl border-4 border-emerald-800 p-4"
            style={{ width: '900px', height: '900px' }}
          >
            {/* Board Border Design */}
            <div className="absolute inset-6 border-2 border-emerald-700 rounded-xl">
              <div className="absolute inset-2 border border-emerald-600 rounded-lg opacity-50"></div>
            </div>

            {/* Center Area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`bg-gradient-to-br ${getCategoryColor(category)} text-white rounded-full w-72 h-72 flex flex-col items-center justify-center shadow-2xl border-6 border-white relative overflow-hidden`}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45"></div>
                </motion.div>
                
                <div className="relative z-10 text-center">
                  <span className="text-6xl mb-4 block">{getCategoryIcon(category)}</span>
                  <h2 className="text-2xl font-bold capitalize mb-2">{category}</h2>
                  <p className="text-lg opacity-90 font-semibold">MASTERY BOARD</p>
                  <div className="text-sm opacity-80 mt-4">
                    <div className="bg-white/20 rounded-full px-4 py-2 mb-2">
                      Position {playerPosition + 1}/40
                    </div>
                    <div className="text-xs">
                      Complete lessons to advance!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Board Tiles Layout - EXACT Monopoly Style */}
            
            {/* Bottom Row: Positions 1-9 */}
            <div className="absolute bottom-4 left-20 right-20 flex justify-between items-end">
              {bottomRow.map((tile, index) => (
                <BoardTileComponent
                  key={tile.id}
                  tile={tile}
                  isPlayerHere={playerPosition === tile.position}
                  category={category}
                  position="bottom"
                  onTileClick={() => handleTileClick(tile)}
                />
              ))}
            </div>

            {/* Bottom Right Corner: Position 10 */}
            <div className="absolute bottom-4 right-4">
              <BoardTileComponent
                key={tiles[9]?.id}
                tile={tiles[9]}
                isPlayerHere={playerPosition === 9}
                category={category}
                position="bottom"
                onTileClick={() => handleTileClick(tiles[9])}
              />
            </div>

            {/* Right Column: Positions 11-19 */}
            <div className="absolute top-20 right-4 bottom-20 flex flex-col justify-between items-end">
              {rightColumn.slice(1, 10).map((tile) => (
                <BoardTileComponent
                  key={tile.id}
                  tile={tile}
                  isPlayerHere={playerPosition === tile.position}
                  category={category}
                  position="right"
                  onTileClick={() => handleTileClick(tile)}
                />
              ))}
            </div>

            {/* Top Right Corner: Position 20 */}
            <div className="absolute top-4 right-4">
              <BoardTileComponent
                key={tiles[19]?.id}
                tile={tiles[19]}
                isPlayerHere={playerPosition === 19}
                category={category}
                position="top"
                onTileClick={() => handleTileClick(tiles[19])}
              />
            </div>

            {/* Top Row: Positions 21-30 (reversed) */}
            <div className="absolute top-4 left-20 right-20 flex justify-between items-start">
              {topRow.map((tile) => (
                <BoardTileComponent
                  key={tile.id}
                  tile={tile}
                  isPlayerHere={playerPosition === tile.position}
                  category={category}
                  position="top"
                  onTileClick={() => handleTileClick(tile)}
                />
              ))}
            </div>

            {/* Top Left Corner: Position 31 */}
            <div className="absolute top-4 left-4">
              <BoardTileComponent
                key={tiles[30]?.id}
                tile={tiles[30]}
                isPlayerHere={playerPosition === 30}
                category={category}
                position="top"
                onTileClick={() => handleTileClick(tiles[30])}
              />
            </div>

            {/* Left Column: Positions 32-39 (reversed) */}
            <div className="absolute top-20 left-4 bottom-20 flex flex-col justify-between items-start">
              {leftColumn.slice(1, 9).map((tile) => (
                <BoardTileComponent
                  key={tile.id}
                  tile={tile}
                  isPlayerHere={playerPosition === tile.position}
                  category={category}
                  position="left"
                  onTileClick={() => handleTileClick(tile)}
                />
              ))}
            </div>

            {/* Bottom Left Corner: Position 40 */}
            <div className="absolute bottom-4 left-4">
              <BoardTileComponent
                key={tiles[39]?.id}
                tile={tiles[39]}
                isPlayerHere={playerPosition === 39}
                category={category}
                position="bottom"
                onTileClick={() => handleTileClick(tiles[39])}
              />
            </div>

            {/* Player Piece */}
            <PlayerPiece
              position={playerPosition}
              category={category}
              totalTiles={40}
              isMoving={false}
            />

            {/* Board Position Numbers for Reference */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center shadow-lg border border-white/20">
                <p className="text-xs font-medium text-gray-800">
                  🎯 Monopoly-Style Board: Complete lessons to advance around the board!
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Game Controls Sidebar */}
        <div className="w-80 space-y-6">
          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Board Progress</span>
                  <span>{playerPosition + 1}/40</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((playerPosition + 1) / 40) * 100}%` }}
                    transition={{ duration: 1 }}
                    className={`bg-gradient-to-r ${getCategoryColor(category)} h-4 rounded-full`}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {tiles.filter(t => t.isCompleted).length}
                  </div>
                  <div className="text-xs text-green-700">Completed</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {tiles.filter(t => !t.isLocked && !t.isCompleted && t.type === 'lesson').length}
                  </div>
                  <div className="text-xs text-blue-700">Available</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Game Message */}
          <AnimatePresence>
            {gameMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Game Update</h3>
                <p className="text-gray-700">{gameMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Lesson Recommendation */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Next Lesson</h3>
            {(() => {
              const nextLesson = tiles.find(t => t.type === 'lesson' && !t.isCompleted && !t.isLocked);
              if (nextLesson) {
                return (
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-1">{nextLesson.title}</h4>
                      <p className="text-sm text-gray-600">{nextLesson.description}</p>
                      {nextLesson.lesson && (
                        <div className="text-xs text-green-600 font-semibold mt-2">
                          +{nextLesson.lesson.xpReward} XP
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleTileClick(nextLesson)}
                      className={`w-full bg-gradient-to-r ${getCategoryColor(category)} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                    >
                      Start This Lesson
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">🎉</div>
                    <p className="text-gray-600 text-sm">
                      Congratulations! You've completed all available lessons in this category.
                    </p>
                  </div>
                );
              }
            })()}
          </div>

          {/* Board Position Reference */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Board Layout</h3>
            <div className="text-xs text-gray-600 font-mono leading-relaxed">
              <div className="text-center mb-2">30 29 28 27 26 25 24 23 22 21 20</div>
              <div className="flex justify-between mb-1">
                <span>31</span>
                <span className="mx-8">...</span>
                <span>19</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>32</span>
                <span className="mx-8">...</span>
                <span>18</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>33</span>
                <span className="mx-8">...</span>
                <span>17</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>34</span>
                <span className="mx-8">...</span>
                <span>16</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>35</span>
                <span className="mx-8">...</span>
                <span>15</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>36</span>
                <span className="mx-8">...</span>
                <span>14</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>37</span>
                <span className="mx-8">...</span>
                <span>13</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>38</span>
                <span className="mx-8">...</span>
                <span>12</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>39</span>
                <span className="mx-8">...</span>
                <span>11</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>40</span>
                <span className="mx-8">---</span>
                <span>10</span>
              </div>
              <div className="text-center">1  2  3  4  5  6  7  8  9</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              You are at position {playerPosition + 1}
            </div>
          </div>

          {/* Board Legend */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Board Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Completed Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Available Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span>Locked Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Special Tiles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Card Modal */}
      <AnimatePresence>
        {showPropertyCard && (
          <PropertyCard
            tile={showPropertyCard}
            category={category}
            onClose={() => setShowPropertyCard(null)}
            onLessonComplete={handleLessonComplete}
          />
        )}
      </AnimatePresence>

      {/* Chance/Community Card Modal */}
      <AnimatePresence>
        {showChanceCard && (
          <ChanceCard
            card={showChanceCard}
            category={category}
            onClose={() => setShowChanceCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}