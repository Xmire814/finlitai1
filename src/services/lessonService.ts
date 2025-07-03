import { supabase } from '../lib/supabase';
import { FinanceCategory } from '../types';

export interface LessonData {
  id: string;
  title: string;
  description: string;
  category: FinanceCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_time: number;
  order_index: number;
  content_sections: any[];
  quiz_questions: any[];
  xp_reward: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BoardTileData {
  id: string;
  category: FinanceCategory;
  position: number;
  tile_type: 'lesson' | 'chance' | 'community' | 'corner';
  lesson_id: string | null;
  title: string;
  description: string | null;
  lesson?: LessonData;
}

export interface LessonInteraction {
  id: string;
  user_id: string;
  lesson_id: string;
  rating: number | null;
  comment: string | null;
  created_at: string;
}

class LessonService {
  // Fetch lessons by category with caching
  private lessonCache = new Map<string, LessonData[]>();
  private cacheExpiry = new Map<string, number>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async getLessonsByCategory(category: FinanceCategory, forceRefresh = false): Promise<LessonData[]> {
    const cacheKey = `lessons_${category}`;
    const now = Date.now();
    
    // Check cache first
    if (!forceRefresh && this.lessonCache.has(cacheKey)) {
      const expiry = this.cacheExpiry.get(cacheKey) || 0;
      if (now < expiry) {
        return this.lessonCache.get(cacheKey)!;
      }
    }

    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;

      // Cache the results
      this.lessonCache.set(cacheKey, data || []);
      this.cacheExpiry.set(cacheKey, now + this.CACHE_DURATION);

      return data || [];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      
      // Return cached data if available, even if expired
      if (this.lessonCache.has(cacheKey)) {
        return this.lessonCache.get(cacheKey)!;
      }
      
      // Return fallback data
      return this.getFallbackLessons(category);
    }
  }

  // Get individual lesson with retry logic
  async getLessonById(id: string, retries = 3): Promise<LessonData | null> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        if (attempt === retries) {
          console.error('All retry attempts failed');
          return null;
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
    return null;
  }

  // Fetch board configuration for a category
  private boardCache = new Map<string, BoardTileData[]>();

  async getBoardConfiguration(category: FinanceCategory, forceRefresh = false): Promise<BoardTileData[]> {
    const cacheKey = `board_${category}`;
    const now = Date.now();
    
    // Check cache first
    if (!forceRefresh && this.boardCache.has(cacheKey)) {
      const expiry = this.cacheExpiry.get(cacheKey) || 0;
      if (now < expiry) {
        return this.boardCache.get(cacheKey)!;
      }
    }

    try {
      const { data, error } = await supabase
        .from('board_configurations')
        .select(`
          *,
          lesson:lessons(*)
        `)
        .eq('category', category)
        .order('position', { ascending: true });

      if (error) throw error;

      // Cache the results
      this.boardCache.set(cacheKey, data || []);
      this.cacheExpiry.set(cacheKey, now + this.CACHE_DURATION);

      return data || [];
    } catch (error) {
      console.error('Error fetching board configuration:', error);
      
      // Return cached data if available
      if (this.boardCache.has(cacheKey)) {
        return this.boardCache.get(cacheKey)!;
      }
      
      return this.getFallbackBoard(category);
    }
  }

  // Search lessons with full-text search
  async searchLessons(query: string, category?: FinanceCategory): Promise<LessonData[]> {
    try {
      let queryBuilder = supabase
        .from('lessons')
        .select('*')
        .eq('is_published', true)
        .textSearch('title,description', query);

      if (category) {
        queryBuilder = queryBuilder.eq('category', category);
      }

      const { data, error } = await queryBuilder
        .order('order_index', { ascending: true })
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching lessons:', error);
      return [];
    }
  }

  // Filter lessons by difficulty
  async getLessonsByDifficulty(difficulty: string, category?: FinanceCategory): Promise<LessonData[]> {
    try {
      let queryBuilder = supabase
        .from('lessons')
        .select('*')
        .eq('is_published', true)
        .eq('difficulty', difficulty);

      if (category) {
        queryBuilder = queryBuilder.eq('category', category);
      }

      const { data, error } = await queryBuilder
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error filtering lessons by difficulty:', error);
      return [];
    }
  }

  // User interaction methods
  async addLessonInteraction(lessonId: string, userId: string, rating?: number, comment?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('lesson_interactions')
        .upsert({
          lesson_id: lessonId,
          user_id: userId,
          rating,
          comment
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error adding lesson interaction:', error);
      return false;
    }
  }

  async getLessonInteractions(lessonId: string): Promise<LessonInteraction[]> {
    try {
      const { data, error } = await supabase
        .from('lesson_interactions')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching lesson interactions:', error);
      return [];
    }
  }

  // Progress tracking
  async updateUserProgress(userId: string, category: FinanceCategory, position: number, completedLessons: string[]): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          category,
          position,
          lessons_completed: completedLessons
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user progress:', error);
      return false;
    }
  }

  async getUserProgress(userId: string, category: FinanceCategory): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('category', category)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
      return data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }
  }

  // Fallback data for offline/error scenarios
  private getFallbackLessons(category: FinanceCategory): LessonData[] {
    const fallbackLessons = {
      spending: [
        {
          id: 'fallback-spending-1',
          title: 'Budget Basics',
          description: 'Learn to create and manage your first budget',
          category: 'spending' as FinanceCategory,
          difficulty: 'beginner' as const,
          estimated_time: 10,
          order_index: 1,
          content_sections: [
            {
              id: 'section-1',
              type: 'text',
              title: 'What is a Budget?',
              content: 'A budget is a plan for how you will spend your money.'
            }
          ],
          quiz_questions: [
            {
              id: 'q1',
              question: 'What is a budget?',
              options: ['A spending plan', 'A savings account', 'A credit card', 'A loan'],
              correctAnswer: 0,
              explanation: 'A budget is a plan for how you will spend your money.'
            }
          ],
          xp_reward: 100,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      investing: [
        {
          id: 'fallback-investing-1',
          title: 'Investment Basics',
          description: 'Start your wealth building journey',
          category: 'investing' as FinanceCategory,
          difficulty: 'beginner' as const,
          estimated_time: 15,
          order_index: 1,
          content_sections: [
            {
              id: 'section-1',
              type: 'text',
              title: 'What is Investing?',
              content: 'Investing is putting money into assets with the expectation of generating income or profit.'
            }
          ],
          quiz_questions: [
            {
              id: 'q1',
              question: 'What is investing?',
              options: ['Spending money', 'Putting money into assets for profit', 'Saving in a bank', 'Borrowing money'],
              correctAnswer: 1,
              explanation: 'Investing is putting money into assets with the expectation of generating income or profit.'
            }
          ],
          xp_reward: 150,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      saving: [
        {
          id: 'fallback-saving-1',
          title: 'Savings Goals',
          description: 'Set and achieve specific financial targets',
          category: 'saving' as FinanceCategory,
          difficulty: 'beginner' as const,
          estimated_time: 10,
          order_index: 1,
          content_sections: [
            {
              id: 'section-1',
              type: 'text',
              title: 'Why Set Savings Goals?',
              content: 'Savings goals give you direction and motivation.'
            }
          ],
          quiz_questions: [
            {
              id: 'q1',
              question: 'Why are savings goals important?',
              options: ['They are not important', 'They provide direction and motivation', 'They cost money', 'They are too hard'],
              correctAnswer: 1,
              explanation: 'Savings goals give you direction and motivation to save money effectively.'
            }
          ],
          xp_reward: 100,
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    };

    return fallbackLessons[category] || [];
  }

  private getFallbackBoard(category: FinanceCategory): BoardTileData[] {
    const fallbackBoard: BoardTileData[] = [];
    
    for (let i = 0; i < 40; i++) {
      let tile_type: 'lesson' | 'chance' | 'community' | 'corner' = 'lesson';
      let title = `${category} Lesson ${i + 1}`;
      
      if ([0, 10, 20, 30].includes(i)) {
        tile_type = 'corner';
        title = ['START', 'MILESTONE', 'HALFWAY', 'ALMOST THERE'][Math.floor(i / 10)];
      } else if ([3, 7, 17, 22, 33, 36].includes(i)) {
        tile_type = i % 2 === 0 ? 'community' : 'chance';
        title = tile_type === 'chance' ? 'FINANCIAL TIP' : 'COMMUNITY CHEST';
      }

      fallbackBoard.push({
        id: `fallback-${category}-${i}`,
        category,
        position: i,
        tile_type,
        lesson_id: tile_type === 'lesson' ? `fallback-${category}-lesson-${i}` : null,
        title,
        description: `${category} content for position ${i + 1}`
      });
    }

    return fallbackBoard;
  }

  // Clear cache method
  clearCache(): void {
    this.lessonCache.clear();
    this.boardCache.clear();
    this.cacheExpiry.clear();
  }
}

export const lessonService = new LessonService();