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
      <Route path="/auth/v1/callback" element={<AuthCallback />} />
    </Routes>
  );
};

// Auth callback handler
const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we have an error in the URL
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        const errorDescription = params.get('error_description');
        
        if (error) {
          console.error('Auth error:', error, errorDescription);
          navigate('/login', { replace: true });
          return;
        }

        // Handle hash params (for implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (accessToken) {
          // Wait for Supabase to process the auth state
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // If we have a user, go to home, otherwise wait a bit more
          if (user) {
            navigate('/', { replace: true });
          } else {
            // Wait a bit more and check again
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (user) {
              navigate('/', { replace: true });
            } else {
              // If still no user, try to handle callback manually
              await authService.handleCallback();
              navigate('/', { replace: true });
            }
          }
        } else {
          // No access token found, go to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, user]);

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
