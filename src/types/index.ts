export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  streak: number;
  hearts: number;
  totalLessonsCompleted: number;
  achievements: Achievement[];
  createdAt: string;
  lastLoginAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: AchievementCategory;
}

export type AchievementCategory = 'lessons' | 'streak' | 'xp' | 'special';

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: FinanceCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  position: number;
  boardPosition: number;
  isCompleted: boolean;
  isLocked: boolean;
  xpReward: number;
  content: LessonContent;
  quiz: QuizQuestion[];
  tileType: TileType;
}

export type FinanceCategory = 'spending' | 'investing' | 'saving';

export type TileType = 'lesson' | 'chance' | 'community' | 'corner' | 'special';

export interface BoardTile {
  id: string;
  position: number;
  type: TileType;
  title: string;
  description?: string;
  lesson?: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  category: FinanceCategory;
}

export interface LessonContent {
  sections: LessonSection[];
}

export interface LessonSection {
  id: string;
  type: 'text' | 'image' | 'video' | 'interactive' | 'tip' | 'example';
  title: string;
  content: string;
  imageUrl?: string;
  tips?: string[];
  examples?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GameState {
  currentHearts: number;
  maxHearts: number;
  streak: number;
  xp: number;
  level: number;
  currentLesson?: string;
  playerPosition: { [category: string]: number };
}

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

// Global type declarations for Chatbase
declare global {
  interface Window {
    chatbase: unknown;
  }
}