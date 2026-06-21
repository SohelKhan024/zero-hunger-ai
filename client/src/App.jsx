import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { 
  Landing, 
  Login, 
  Register, 
  Dashboard, 
  Donate, 
  Requests,
  AIPredictions, 
  HungerMap, 
  AIChatbot,
  Analytics 
} from './pages';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/ai-predictions" element={<AIPredictions />} />
            <Route path="/hunger-map" element={<HungerMap />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
