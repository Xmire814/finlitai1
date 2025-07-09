import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          level: number
          xp: number
          streak: number
          hearts: number
          total_lessons_completed: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          level?: number
          xp?: number
          streak?: number
          hearts?: number
          total_lessons_completed?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          level?: number
          xp?: number
          streak?: number
          hearts?: number
          total_lessons_completed?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          category: string
          position: number
          lessons_completed: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          position?: number
          lessons_completed?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          position?: number
          lessons_completed?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: string
          estimated_time: number
          order_index: number
          content_sections: unknown[]
          quiz_questions: unknown[]
          xp_reward: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          difficulty: string
          estimated_time?: number
          order_index: number
          content_sections?: unknown[]
          quiz_questions?: unknown[]
          xp_reward?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          difficulty?: string
          estimated_time?: number
          order_index?: number
          content_sections?: unknown[]
          quiz_questions?: unknown[]
          xp_reward?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      board_configurations: {
        Row: {
          id: string
          category: string
          position: number
          tile_type: string
          lesson_id: string | null
          title: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          position: number
          tile_type: string
          lesson_id?: string | null
          title: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          position?: number
          tile_type?: string
          lesson_id?: string | null
          title?: string
          description?: string | null
          created_at?: string
        }
      }
      lesson_interactions: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          rating: number | null
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          rating?: number | null
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          rating?: number | null
          comment?: string | null
          created_at?: string
        }
      }
    }
  }
}