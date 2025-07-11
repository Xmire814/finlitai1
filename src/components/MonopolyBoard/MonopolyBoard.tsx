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
        { title: 'Diversification Tip', content: "Don't put all eggs in one basket. Spread investments across different asset classes.", reward: '+75 XP' },
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

  const topRow = tiles.slice(20, 30);
  const rightColumn = tiles.slice(10, 19);
  const bottomRow = tiles.slice(0, 9).reverse();
  const leftColumn = tiles.slice(31, 39).reverse();

  const clockwiseTiles = [
    tiles[30],
    ...topRow,
    tiles[19],
    ...rightColumn,
    tiles[9],
    ...bottomRow,
    tiles[39],
    ...leftColumn
  ];

  const lessonTiles = clockwiseTiles.filter(t => t.type === 'lesson');
  const lessonNumberMap = Object.fromEntries(lessonTiles.map((t, i) => [t.id, i + 1]));

  return (
    <div className="max-w-7xl mx-auto p-4">
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

      <div className="grid grid-cols-11 grid-rows-11 w-[900px] h-[900px] mx-auto relative">
        {clockwiseTiles.map((tile, index) => {
          const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          let gridRow = 1;
          let gridCol = 1;

          if (index <= 10) {
            gridRow = 1;
            gridCol = 11 - index;
          } else if (index <= 20) {
            gridRow = index - 10 + 1;
            gridCol = 1;
          } else if (index <= 30) {
            gridRow = 11;
            gridCol = index - 20 + 1;
          } else {
            gridRow = 41 - index;
            gridCol = 11;
          }

          return (
            <div
              key={tile.id}
              style={{ gridRow, gridColumn: gridCol }}
            >
              <BoardTileComponent
                tile={tile}
                isPlayerHere={playerPosition === tile.position}
                category={category}
                position="bottom"
                lessonNumber={lessonNumberMap[tile.id]}
                onTileClick={() => handleTileClick(tile)}
              />
            </div>
          );
        })}

        <PlayerPiece
          position={playerPosition}
          category={category}
          totalTiles={40}
          isMoving={false}
        />
      </div>

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
