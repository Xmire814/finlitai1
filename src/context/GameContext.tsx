import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, Lesson, FinanceCategory, BoardTile, TileType } from '../types';
import { useAuth } from './AuthContext';

interface GameContextType {
  gameState: GameState;
  lessons: Lesson[];
  boardTiles: { [category: string]: BoardTile[] };
  updateGameState: (updates: Partial<GameState>) => void;
  completeLesson: (lessonId: string) => void;
  loseHeart: () => void;
  restoreHearts: () => void;
  getLessonsByCategory: (category: FinanceCategory) => Lesson[];
  getBoardByCategory: (category: FinanceCategory) => BoardTile[];
  movePlayer: (category: FinanceCategory, steps: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { user, updateProfile } = useAuth();
  const [gameState, setGameState] = useState<GameState>({
    currentHearts: 3,
    maxHearts: 3,
    streak: 0,
    xp: 0,
    level: 1,
    playerPosition: { spending: 0, investing: 0, saving: 0 },
  });

  const [lessons] = useState<Lesson[]>(generateComprehensiveLessons());
  const [boardTiles, setBoardTiles] = useState<{ [category: string]: BoardTile[] }>(generateBoardTiles(lessons));

  useEffect(() => {
    if (user) {
      setGameState({
        currentHearts: user.hearts,
        maxHearts: 3,
        streak: user.streak,
        xp: user.xp,
        level: user.level,
        playerPosition: { spending: 0, investing: 0, saving: 0 },
      });
    }
  }, [user]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
    if (user) {
      updateProfile({
        hearts: updates.currentHearts ?? user.hearts,
        streak: updates.streak ?? user.streak,
        xp: updates.xp ?? user.xp,
        level: updates.level ?? user.level,
      });
    }
  };

  const completeLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && user) {
      const newXp = gameState.xp + lesson.xpReward;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const newStreak = gameState.streak + 1;
      
      // Update board tiles to mark lesson as completed and unlock next lesson
      setBoardTiles(prev => {
        const updatedTiles = { ...prev };
        const categoryTiles = [...updatedTiles[lesson.category]];
        
        // Mark current lesson as completed
        const currentTileIndex = categoryTiles.findIndex(t => t.lesson?.id === lessonId);
        if (currentTileIndex !== -1) {
          categoryTiles[currentTileIndex] = {
            ...categoryTiles[currentTileIndex],
            isCompleted: true
          };
          
          // Unlock next lesson tile
          const nextTileIndex = currentTileIndex + 1;
          if (nextTileIndex < categoryTiles.length && categoryTiles[nextTileIndex].type === 'lesson') {
            categoryTiles[nextTileIndex] = {
              ...categoryTiles[nextTileIndex],
              isLocked: false
            };
          }
        }
        
        updatedTiles[lesson.category] = categoryTiles;
        return updatedTiles;
      });
      
      // Move player forward on the board
      const newPosition = { ...gameState.playerPosition };
      const currentPos = newPosition[lesson.category];
      newPosition[lesson.category] = Math.min(currentPos + 1, 39);
      
      updateGameState({
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        playerPosition: newPosition,
      });

      updateProfile({
        totalLessonsCompleted: user.totalLessonsCompleted + 1,
      });
    }
  };

  const loseHeart = () => {
    if (gameState.currentHearts > 0) {
      const newHearts = gameState.currentHearts - 1;
      updateGameState({
        currentHearts: newHearts,
      });
    }
  };

  const restoreHearts = () => {
    updateGameState({
      currentHearts: gameState.maxHearts,
    });
  };

  const getLessonsByCategory = (category: FinanceCategory) => {
    return lessons.filter(lesson => lesson.category === category);
  };

  const getBoardByCategory = (category: FinanceCategory) => {
    return boardTiles[category] || [];
  };

  const movePlayer = (category: FinanceCategory, steps: number) => {
    const newPosition = { ...gameState.playerPosition };
    newPosition[category] = Math.min(newPosition[category] + steps, 39);
    updateGameState({ playerPosition: newPosition });
  };

  return (
    <GameContext.Provider value={{
      gameState,
      lessons,
      boardTiles,
      updateGameState,
      completeLesson,
      loseHeart,
      restoreHearts,
      getLessonsByCategory,
      getBoardByCategory,
      movePlayer,
    }}>
      {children}
    </GameContext.Provider>
  );
}

function generateComprehensiveLessons(): Lesson[] {
  const categories: FinanceCategory[] = ['spending', 'investing', 'saving'];
  const lessons: Lesson[] = [];

  const lessonTemplates = {
    spending: [
      { title: "Budget Basics", description: "Learn to create and manage your first budget" },
      { title: "Needs vs Wants", description: "Distinguish between essential and optional expenses" },
      { title: "Smart Shopping", description: "Get more value for your money with smart shopping strategies" },
      { title: "Subscription Audit", description: "Cancel unused subscriptions and save money" },
      { title: "Meal Planning", description: "Save money on food expenses with planning" },
      { title: "Transportation Costs", description: "Optimize your commute and travel expenses" },
      { title: "Housing Decisions", description: "Make smart rent vs buy decisions" },
      { title: "Insurance Basics", description: "Protect yourself financially with proper coverage" },
      { title: "Utility Bills", description: "Reduce monthly utility costs effectively" },
      { title: "Entertainment Budget", description: "Have fun without breaking the bank" },
      { title: "Clothing Budget", description: "Dress well on a budget" },
      { title: "Gift Giving", description: "Give thoughtful gifts within your means" },
      { title: "Emergency Expenses", description: "Handle unexpected costs without debt" },
      { title: "Seasonal Spending", description: "Plan for holiday and seasonal expenses" },
      { title: "Impulse Control", description: "Overcome impulse buying habits" }
    ],
    investing: [
      { title: "Investment Basics", description: "Start your wealth building journey" },
      { title: "Stock Market 101", description: "Understand how the stock market works" },
      { title: "Index Funds", description: "Diversify with low-cost index funds" },
      { title: "Risk Tolerance", description: "Find your investment comfort zone" },
      { title: "Dollar Cost Averaging", description: "Invest consistently over time" },
      { title: "Retirement Accounts", description: "401k and IRA investment strategies" },
      { title: "Compound Interest", description: "Harness the power of compound growth" },
      { title: "Asset Allocation", description: "Balance your investment portfolio" },
      { title: "Real Estate Investing", description: "Property investment fundamentals" },
      { title: "Bond Investments", description: "Fixed income securities explained" },
      { title: "Market Volatility", description: "Stay calm during market fluctuations" },
      { title: "Investment Fees", description: "Minimize costs to maximize returns" },
      { title: "Tax-Advantaged Accounts", description: "Maximize tax benefits in investing" },
      { title: "Rebalancing", description: "Maintain your target asset allocation" },
      { title: "Long-term Strategy", description: "Build wealth over decades" }
    ],
    saving: [
      { title: "Savings Goals", description: "Set and achieve specific financial targets" },
      { title: "High-Yield Accounts", description: "Maximize your savings interest earnings" },
      { title: "Automatic Savings", description: "Pay yourself first with automation" },
      { title: "Emergency Fund", description: "Build 3-6 months of expenses saved" },
      { title: "Vacation Fund", description: "Save for your dream vacation" },
      { title: "Down Payment", description: "Save for a home purchase" },
      { title: "Sinking Funds", description: "Save for known future expenses" },
      { title: "CD Laddering", description: "Maximize interest with certificate deposits" },
      { title: "Money Market", description: "Higher yield savings account options" },
      { title: "Savings Challenges", description: "Fun ways to boost your savings" },
      { title: "Round-Up Savings", description: "Save your spare change automatically" },
      { title: "Cashback Rewards", description: "Earn money while you spend" },
      { title: "Savings Rate", description: "Track and improve your savings percentage" },
      { title: "Financial Milestones", description: "Celebrate your savings achievements" },
      { title: "Retirement Savings", description: "Save for your golden years" }
    ]
  };

  categories.forEach((category, categoryIndex) => {
    const categoryLessons = lessonTemplates[category];
    
    categoryLessons.forEach((lessonTemplate, lessonIndex) => {
      const lesson: Lesson = {
        id: `${category}-${lessonIndex + 1}`,
        title: lessonTemplate.title,
        description: lessonTemplate.description,
        category,
        difficulty: lessonIndex < 5 ? 'beginner' : lessonIndex < 10 ? 'intermediate' : 'advanced',
        position: categoryIndex * 30 + lessonIndex + 1,
        boardPosition: lessonIndex,
        isCompleted: false,
        isLocked: lessonIndex > 0, // Only first lesson is unlocked
        xpReward: 100 + (lessonIndex * 10),
        content: {
          sections: [
            {
              id: `${category}-${lessonIndex + 1}-section-1`,
              type: 'text',
              title: `${lessonTemplate.title} Fundamentals`,
              content: `This lesson covers the essential concepts of ${lessonTemplate.title.toLowerCase()} that will help you master this important aspect of personal finance.`,
            },
            {
              id: `${category}-${lessonIndex + 1}-section-2`,
              type: 'tip',
              title: 'Key Tips',
              content: `Here are the most important strategies for ${lessonTemplate.title.toLowerCase()}:`,
              tips: [
                'Start with small, manageable steps',
                'Be consistent with your approach',
                'Track your progress regularly',
                'Adjust your strategy as needed'
              ]
            }
          ],
        },
        quiz: [
          {
            id: `${category}-${lessonIndex + 1}-q1`,
            question: `What is the most important principle of ${lessonTemplate.title.toLowerCase()}?`,
            options: ['Planning ahead', 'Taking action', 'Understanding the fundamentals', 'All of the above'],
            correctAnswer: 3,
            explanation: `Success in ${lessonTemplate.title.toLowerCase()} requires understanding fundamentals, planning ahead, and taking consistent action.`,
          },
        ],
        tileType: 'lesson',
      };
      lessons.push(lesson);
    });
  });

  return lessons;
}

function generateBoardTiles(lessons: Lesson[]): { [category: string]: BoardTile[] } {
  const categories: FinanceCategory[] = ['spending', 'investing', 'saving'];
  const boardTiles: { [category: string]: BoardTile[] } = {};

  categories.forEach(category => {
    const tiles: BoardTile[] = [];
    const categoryLessons = lessons.filter(l => l.category === category);

    // Create 40 tiles for Monopoly-style board following the exact layout requested
    for (let i = 0; i < 40; i++) {
      let tileType: TileType = 'lesson';
      let title = '';
      let description = '';
      let lesson: Lesson | undefined;

      // Corner spaces (positions 0, 10, 20, 30)
      if (i === 0) {
        tileType = 'corner';
        title = 'START';
        description = 'Begin your financial journey here!';
      } else if (i === 10) {
        tileType = 'corner';
        title = 'MILESTONE';
        description = 'Quarter way through your journey!';
      } else if (i === 20) {
        tileType = 'corner';
        title = 'HALFWAY';
        description = 'You\'re halfway to mastery!';
      } else if (i === 30) {
        tileType = 'corner';
        title = 'ALMOST THERE';
        description = 'Nearly completed your journey!';
      }
      // Special tiles (chance and community)
      else if ([2, 7, 17, 22, 33, 36].includes(i)) {
        tileType = i % 2 === 0 ? 'community' : 'chance';
        title = tileType === 'chance' ? 'FINANCIAL TIP' : 'COMMUNITY CHEST';
        description = tileType === 'chance' ? 'Draw a financial wisdom card' : 'Learn from community experiences';
      }
      // Lesson tiles
      else {
        // Distribute lessons evenly across the board
        const lessonIndex = Math.floor((i - 1) / 1.3); // Adjust distribution
        const categoryLesson = categoryLessons[lessonIndex % categoryLessons.length];
        if (categoryLesson) {
          lesson = categoryLesson;
          title = categoryLesson.title;
          description = categoryLesson.description;
        } else {
          title = `${category.charAt(0).toUpperCase() + category.slice(1)} Lesson ${i}`;
          description = `Learn essential ${category} skills`;
        }
      }

      tiles.push({
        id: `${category}-tile-${i}`,
        position: i,
        type: tileType,
        title,
        description,
        lesson,
        isCompleted: false,
        isLocked: tileType === 'lesson' && i > 1, // First lesson tile is unlocked
        category,
      });
    }

    boardTiles[category] = tiles;
  });

  return boardTiles;
}