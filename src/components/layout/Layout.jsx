import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children, showFooter = true }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  
  const isAuthPage = ['/login', '/register', '/forgot-password'].some(path => 
    location.pathname.startsWith(path)
  );
  
  const isDashboard = location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/donate') ||
    location.pathname.startsWith('/requests') ||
    location.pathname.startsWith('/analytics') ||
    location.pathname.startsWith('/ai');

  // Light mode optimized background styles
  const dashboardBg = darkMode ? 'bg-dark' : 'bg-light-bg-secondary';
  const pageBg = darkMode ? 'bg-dark' : 'bg-light-bg';

  if (isDashboard) {
    return (
      <div className={`min-h-screen ${dashboardBg}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      {showFooter && !isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
