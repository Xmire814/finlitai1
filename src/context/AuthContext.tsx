import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Supabase auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || '',
          level: 1,
          xp: 0,
          streak: 0,
          hearts: 3,
          totalLessonsCompleted: 0,
          achievements: [],
          createdAt: session.user.created_at,
          lastLoginAt: new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
    });
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || '',
          level: 1,
          xp: 0,
          streak: 0,
          hearts: 3,
          totalLessonsCompleted: 0,
          achievements: [],
          createdAt: session.user.created_at,
          lastLoginAt: new Date().toISOString(),
        });
      }
      setLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) throw error;
      // User will need to confirm email
      setUser(data.user ? {
        id: data.user.id,
        email: data.user.email || '',
        name: fullName,
        level: 1,
        xp: 0,
        streak: 0,
        hearts: 3,
        totalLessonsCompleted: 0,
        achievements: [],
        createdAt: data.user.created_at,
        lastLoginAt: new Date().toISOString(),
      } : null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user ? {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.full_name || '',
        level: 1,
        xp: 0,
        streak: 0,
        hearts: 3,
        totalLessonsCompleted: 0,
        achievements: [],
        createdAt: data.user.created_at,
        lastLoginAt: new Date().toISOString(),
      } : null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...updates };
      
      // Update in Supabase
      const { error } = await supabase.auth.updateUser({
        ...updates,
        // Ensure we don't overwrite important fields
        user_metadata: { ...user.user_metadata, ...updates },
      });
      if (error) throw error;

      // Update in local state
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;

      // In a real app, this would send an email
      console.log('Password reset email would be sent to:', email);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}