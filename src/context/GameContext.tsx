import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, FinanceCategory, BoardTile, TileType } from '../types';
import { useAuth } from './AuthContext';
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
            const tile: BoardTile = {
              id: config.id,
              position: config.position,
              type: config.tile_type as TileType,
              title: config.title,
              description: config.description || undefined,
              lesson: lessonObj ? convertLessonData(lessonObj) : undefined,
              isCompleted: false, // Will be updated based on user progress
              isLocked: config.tile_type === 'lesson' && config.position !== minLessonPosition, // Only the first lesson tile is unlocked
              category,
            };
            return tile;
          }));

          allBoardTiles[category] = boardTiles;
        } catch (categoryError) {
          console.error(`Error loading ${category} data:`, categoryError);
          // Continue with other categories even if one fails
        }
      }));

      setLessons(allLessons);
      setBoardTiles(allBoardTiles);
      
      // Load user progress if user is logged in
      if (user) {
        await loadUserProgress();
      }
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError('Failed to load lesson data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    if (!user) return;

    const categories: FinanceCategory[] = ['spending', 'investing', 'saving'];
    const updatedPosition = { ...gameState.playerPosition };

    await Promise.all(categories.map(async (category) => {
      try {
        const progress = await lessonService.getUserProgress(user.id, category);
        if (progress) {
          updatedPosition[category] = progress.position;
          
          // Update board tiles based on user progress
          setBoardTiles(prev => {
            const categoryTiles = prev[category] || [];
            const updatedTiles = categoryTiles.map(tile => ({
              ...tile,
              isCompleted: progress.lessons_completed.includes(tile.lesson?.id || ''),
              isLocked: tile.type === 'lesson' && tile.position > progress.position + 1
            }));
            
            return {
              ...prev,
              [category]: updatedTiles
            };
          });
        }
      } catch (error) {
        console.error(`Error loading progress for ${category}:`, error);
      }
    }));

    setGameState(prev => ({
      ...prev,
      playerPosition: updatedPosition
    }));
  };

  const convertLessonData = (lessonData: Record<string, unknown>) => {
    return {
      id: lessonData.id,
      title: lessonData.title,
      description: lessonData.description,
      category: lessonData.category,
      difficulty: lessonData.difficulty,
      position: lessonData.order_index,
      boardPosition: lessonData.order_index,
      isCompleted: false, // Will be updated based on user progress
      isLocked: lessonData.order_index > 1,
      xpReward: lessonData.xp_reward,
      content: {
        sections: lessonData.content_sections || []
      },
      quiz: lessonData.quiz_questions || [],
      tileType: 'lesson' as TileType
    };
  };

  useEffect(() => {
    if (user) {
      setGameState({
        currentHearts: user.hearts,
        maxHearts: 3,
        streak: user.streak,
        xp: user.xp,
        level: user.level,
        playerPosition: gameState.playerPosition, // Keep existing positions
      });
      loadInitialData();
    }
  }, [user, loadInitialData]);

  useEffect(() => {
    // Update the player's position on the board when gameState.playerPosition changes
    setGameState(prev => ({
      ...prev,
      playerPosition: {
        ...prev.playerPosition,
        ...gameState.playerPosition,
      }
    }));
  }, [gameState.playerPosition]);

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
      const newXp = gameState.xp + lesson.xp_reward;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const newStreak = gameState.streak + 1;
      
      // Update user progress in Supabase
      const updateProgress = async () => {
        try {
          const currentProgress = await lessonService.getUserProgress(user.id, lesson.category);
          const completedLessons = (currentProgress && typeof currentProgress === 'object' && 'lessons_completed' in currentProgress)
            ? (currentProgress as { lessons_completed: string[] }).lessons_completed
            : [];
          
          if (!completedLessons.includes(lessonId)) {
            completedLessons.push(lessonId);
            const newPosition = (currentProgress && typeof currentProgress === 'object' && 'position' in currentProgress)
              ? Math.min((currentProgress as { position: number }).position + 1, 39)
              : 0;
            
            await lessonService.updateUserProgress(
              user.id,
              lesson.category,
              newPosition,
              completedLessons
            );
          }
        } catch (error) {
          console.error('Error updating progress:', error);
        }
      };
      
      updateProgress();
      
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

  const refreshData = async () => {
    await loadInitialData();
  };

  return (
    <GameContext.Provider value={{
      gameState,
      lessons,
      boardTiles,
      loading,
      error,
      updateGameState,
      completeLesson,
      loseHeart,
      restoreHearts,
      getLessonsByCategory,
      getBoardByCategory,
      movePlayer,
      refreshData,
    }}>
      {children}
    </GameContext.Provider>
  );
}