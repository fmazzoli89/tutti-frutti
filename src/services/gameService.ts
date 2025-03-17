import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Game = Database['public']['Tables']['games']['Row'];
type GameAnswer = Database['public']['Tables']['game_answers']['Row'];
type GameScore = Database['public']['Tables']['game_scores']['Row'];

export const gameService = {
  async createGame(letter: string): Promise<Game> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('games')
      .insert({
        letter,
        status: 'active',
        start_time: new Date().toISOString(),
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async submitAnswer(gameId: string, categoryId: string, word: string, isCorrect: boolean): Promise<GameAnswer> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('game_answers')
      .insert({
        game_id: gameId,
        user_id: user.id,
        category_id: categoryId,
        word,
        is_correct: isCorrect,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async submitScore(
    gameId: string,
    score: number,
    correctWords: number,
    bonusPoints: number,
    timePoints: number
  ): Promise<GameScore> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('game_scores')
      .insert({
        game_id: gameId,
        user_id: user.id,
        score,
        correct_words: correctWords,
        bonus_points: bonusPoints,
        time_points: timePoints,
      })
      .select()
      .single();

    if (error) throw error;

    // Update game status to completed
    await supabase
      .from('games')
      .update({
        status: 'completed',
        end_time: new Date().toISOString(),
      })
      .eq('id', gameId);

    return data;
  },

  async getGameHistory(userId: string): Promise<{ games: Game[]; scores: GameScore[] }> {
    const { data: games, error: gamesError } = await supabase
      .from('games')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (gamesError) throw gamesError;

    const { data: scores, error: scoresError } = await supabase
      .from('game_scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (scoresError) throw scoresError;

    return { games, scores };
  },

  async getLeaderboard(): Promise<{ username: string; totalScore: number }[]> {
    const { data, error } = await supabase
      .from('game_scores')
      .select(`
        score,
        users:user_id (
          username
        )
      `)
      .order('score', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Aggregate scores by user
    const userScores = data.reduce((acc: { [key: string]: number }, curr) => {
      const username = curr.users.username;
      acc[username] = (acc[username] || 0) + curr.score;
      return acc;
    }, {});

    // Convert to array and sort
    return Object.entries(userScores)
      .map(([username, totalScore]) => ({ username, totalScore }))
      .sort((a, b) => b.totalScore - a.totalScore);
  },
}; 