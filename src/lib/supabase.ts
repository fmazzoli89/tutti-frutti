import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          username: string;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          username?: string;
          avatar_url?: string | null;
        };
      };
      games: {
        Row: {
          id: string;
          created_at: string;
          letter: string;
          status: 'active' | 'completed';
          start_time: string;
          end_time: string | null;
          created_by: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          letter: string;
          status: 'active' | 'completed';
          start_time: string;
          end_time?: string | null;
          created_by: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          letter?: string;
          status?: 'active' | 'completed';
          start_time?: string;
          end_time?: string | null;
          created_by?: string;
        };
      };
      game_answers: {
        Row: {
          id: string;
          game_id: string;
          user_id: string;
          category_id: string;
          word: string;
          is_correct: boolean;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          user_id: string;
          category_id: string;
          word: string;
          is_correct: boolean;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          game_id?: string;
          user_id?: string;
          category_id?: string;
          word?: string;
          is_correct?: boolean;
          submitted_at?: string;
        };
      };
      game_scores: {
        Row: {
          id: string;
          game_id: string;
          user_id: string;
          score: number;
          correct_words: number;
          bonus_points: number;
          time_points: number;
        };
        Insert: {
          id?: string;
          game_id: string;
          user_id: string;
          score: number;
          correct_words: number;
          bonus_points: number;
          time_points: number;
        };
        Update: {
          id?: string;
          game_id?: string;
          user_id?: string;
          score?: number;
          correct_words?: number;
          bonus_points?: number;
          time_points?: number;
        };
      };
    };
  };
}; 