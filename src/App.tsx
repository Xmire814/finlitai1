import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import SpendingPage from './pages/SpendingPage';
import InvestingPage from './pages/InvestingPage';
import SavingPage from './pages/SavingPage';
import ProfilePage from './pages/ProfilePage';
import AIBotPage from './pages/AIBotPage';
import LessonInterface from './components/Lesson/LessonInterface';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <div className="text-primary-600 font-semibold">Loading your financial journey...</div>
        </div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/" />;
}

function AppRoutes() {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/spending"
        element={
          <ProtectedRoute>
            <SpendingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/investing"
        element={
          <ProtectedRoute>
            <InvestingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saving"
        element={
          <ProtectedRoute>
            <SavingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-bot"
        element={
          <ProtectedRoute>
            <AIBotPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lesson/:lessonId"
        element={
          <ProtectedRoute>
            <LessonInterface />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;