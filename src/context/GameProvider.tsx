import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, FinanceCategory, BoardTile, TileType } from '../types';
import { useAuth } from './AuthProvider';
import { lessonService, LessonData } from '../services/lessonService';

interface GameContextType {
  gameState: GameState;
  lessons: LessonData[];
  boardTiles: { [category: string]: BoardTile[] };
  loading: boolean;
  error: string | null;
  updateGameState: (updates: Partial<GameState>) => void;
  completeLesson: (lessonId: string) => void;
  loseHeart: () => void;
  restoreHearts: () => void;
  getLessonsByCategory: (category: FinanceCategory) => LessonData[];
  getBoardByCategory: (category: FinanceCategory) => BoardTile[];
  movePlayer: (category: FinanceCategory, steps: number) => void;
  refreshData: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    currentHearts: 3,
    maxHearts: 3,
    streak: 0,
    xp: 0,
    level: 1,
    playerPosition: { spending: 0, investing: 0, saving: 0 },
  });

  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [boardTiles, setBoardTiles] = useState<{ [category: string]: BoardTile[] }>({});

  // Load initial data from Supabase
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Load lessons and board configurations for all categories
      const categories: FinanceCategory[] = ['spending', 'investing', 'saving'];
      const allLessons: LessonData[] = [];
      const allBoardTiles: { [category: string]: BoardTile[] } = {};
      await Promise.all(categories.map(async (category) => {
        try {
          // Fetch lessons for this category
          const categoryLessons = await lessonService.getLessonsByCategory(category);
          allLessons.push(...categoryLessons);
          // Fetch board configuration for this category
          const boardConfig = await lessonService.getBoardConfiguration(category);
          // Find the first lesson tile position for this category
          const lessonPositions = boardConfig.filter(cfg => cfg.tile_type === 'lesson').map(cfg => cfg.position);
          const minLessonPosition = Math.min(...lessonPositions);
          // Convert board configuration to BoardTile format
          const boardTiles = await Promise.all(boardConfig.map(async (config) => {
            let lessonObj = undefined;
            if (config.tile_type === 'lesson' && config.lesson_id) {
              lessonObj = categoryLessons.find(l => l.id === config.lesson_id);
            }
            // ...rest of conversion logic...
            return {
              ...config,
              lesson: lessonObj,
            } as BoardTile;
          }));
          allBoardTiles[category] = boardTiles;
        } catch (err) {
          setError('Failed to load board data');
        }
      }));
      setLessons(allLessons);
      setBoardTiles(allBoardTiles);
    } catch (err) {
      setError('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  // ...other context logic (updateGameState, completeLesson, etc.) should be moved here from GameContext.tsx...

  const value: GameContextType = {
    gameState,
    lessons,
    boardTiles,
    loading,
    error,
    updateGameState: () => {},
    completeLesson: () => {},
    loseHeart: () => {},
    restoreHearts: () => {},
    getLessonsByCategory: () => [],
    getBoardByCategory: () => [],
    movePlayer: () => {},
    refreshData: async () => {},
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
