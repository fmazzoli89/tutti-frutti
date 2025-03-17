import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import GameScreen from './components/GameScreen';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { authService } from './services/authService';
import './App.css';

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return <>{children}</>;
};

// Main app content
const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <GameProvider>
              <GameScreen />
            </GameProvider>
          </ProtectedRoute>
        }
      />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
};

// Auth callback handler
const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        if (hashParams.has('access_token')) {
          // Wait for Supabase to process the auth state
          await new Promise(resolve => setTimeout(resolve, 500));
          await authService.handleCallback();
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return <div>Completing sign in...</div>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
