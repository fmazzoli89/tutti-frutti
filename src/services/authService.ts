import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type User = Database['public']['Tables']['users']['Row'];

class AuthService {
  async signUp(email: string, password: string, username: string) {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            username,
            email,
          },
        ]);

      if (profileError) throw profileError;
    }

    return authData;
  }

  async handleEmailConfirmation(userId: string, username: string) {
    try {
      // Create user profile after email confirmation
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: userId,
          username,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw new Error('Failed to create user profile after confirmation.');
      }

      return true;
    } catch (error) {
      console.error('Email confirmation handling error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateProfile(updates: Partial<User>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;
  }

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`
      }
    });

    if (error) throw error;
    return data;
  }

  async handleCallback() {
    // Get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    if (!user) {
      throw new Error('No user found after authentication');
    }

    try {
      // Check if user profile exists
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profile) {
        // Create user profile if it doesn't exist
        const username = user.email?.split('@')[0] || `user_${Date.now()}`;
        await this.handleEmailConfirmation(user.id, username);
      }

      return user;
    } catch (error) {
      console.error('Error handling callback:', error);
      throw error;
    }
  }
}

export const authService = new AuthService(); 