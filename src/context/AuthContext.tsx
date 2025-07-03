import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

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

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_project_url_here';
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('finlit_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('finlit_user');
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('finlit_users') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('An account with this email already exists');
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: fullName,
        level: 1,
        xp: 0,
        streak: 0,
        hearts: 3,
        totalLessonsCompleted: 0,
        achievements: [],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      // Save to localStorage
      existingUsers.push({ ...newUser, password }); // In real app, never store passwords in plain text
      localStorage.setItem('finlit_users', JSON.stringify(existingUsers));
      localStorage.setItem('finlit_user', JSON.stringify(newUser));
      
      setUser(newUser);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      const existingUsers = JSON.parse(localStorage.getItem('finlit_users') || '[]');
      const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create user object without password
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        level: foundUser.level || 1,
        xp: foundUser.xp || 0,
        streak: foundUser.streak || 0,
        hearts: foundUser.hearts || 3,
        totalLessonsCompleted: foundUser.totalLessonsCompleted || 0,
        achievements: foundUser.achievements || [],
        createdAt: foundUser.createdAt,
        lastLoginAt: new Date().toISOString(),
      };

      localStorage.setItem('finlit_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem('finlit_user');
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
      
      // Update in localStorage
      localStorage.setItem('finlit_user', JSON.stringify(updatedUser));
      
      // Update in users array
      const existingUsers = JSON.parse(localStorage.getItem('finlit_users') || '[]');
      const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
        localStorage.setItem('finlit_users', JSON.stringify(existingUsers));
      }
      
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
      const existingUsers = JSON.parse(localStorage.getItem('finlit_users') || '[]');
      const foundUser = existingUsers.find((u: any) => u.email === email);
      
      if (!foundUser) {
        throw new Error('No account found with this email address');
      }

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