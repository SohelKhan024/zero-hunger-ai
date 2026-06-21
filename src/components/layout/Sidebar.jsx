import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, UtensilsCrossed, Heart, Users, TrendingUp,
  Bot, MapPin, Settings, LogOut, ChevronLeft, Menu,
  Package, ShoppingCart, BarChart3, HandHeart,
  MapPinned, Building2, Truck, Activity, Sparkles,
  Globe, Leaf, Award, Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

// Professional sidebar width constants
const SIDEBAR_EXPANDED_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 72;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Menu items organized by role with AI-powered items
  const menuItems = {
    donor: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'AI' },
      { name: 'Donate Food', path: '/donate', icon: UtensilsCrossed },
      { name: 'Request Food', path: '/requests', icon: ShoppingCart },
      { name: 'AI Food Matching', path: '/ai-predictions', icon: Bot, ai: true },
      { name: 'Hunger Hotspots', path: '/hunger-map', icon: MapPinned },
      { name: 'Impact Reports', path: '/analytics', icon: BarChart3 },
      { name: 'Nearby NGOs', path: '/ngos', icon: Building2 },
      { name: 'Recent Donations', path: '/my-donations', icon: Package },
    ],
    ngo: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'AI' },
      { name: 'Request Food', path: '/requests', icon: ShoppingCart },
      { name: 'AI Food Matching', path: '/ai-predictions', icon: Bot, ai: true },
      { name: 'Hunger Hotspots', path: '/hunger-map', icon: MapPinned },
      { name: 'Impact Reports', path: '/analytics', icon: BarChart3 },
      { name: 'Nearby NGOs', path: '/ngos', icon: Building2 },
      { name: 'Volunteers', path: '/volunteers', icon: Users },
      { name: 'Inventory', path: '/inventory', icon: Package },
    ],
    volunteer: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'AI' },
      { name: 'Pickups', path: '/pickups', icon: Truck },
      { name: 'Deliveries', path: '/deliveries', icon: HandHeart },
      { name: 'Hunger Hotspots', path: '/hunger-map', icon: MapPinned },
      { name: 'Impact Reports', path: '/analytics', icon: BarChart3 },
      { name: 'Nearby NGOs', path: '/ngos', icon: Building2 },
    ],
    admin: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'AI' },
      { name: 'Users', path: '/users', icon: Users },
      { name: 'NGOs', path: '/ngos', icon: Building2 },
      { name: 'Donations', path: '/all-donations', icon: Package },
      { name: 'Requests', path: '/requests', icon: ShoppingCart },
      { name: 'AI Predictions', path: '/ai-predictions', icon: TrendingUp, ai: true },
      { name: 'Hunger Map', path: '/hunger-map', icon: MapPinned },
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    ],
  };

  const items = menuItems[user?.role] || menuItems.donor;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Light mode text colors
  const normalText = darkMode ? 'text-gray-400' : 'text-light-text-secondary';
  const activeText = darkMode ? 'text-white' : 'text-white';
  const hoverBg = darkMode ? 'hover:bg-white/[0.08] hover:text-white' : 'hover:bg-primary/5 hover:text-primary';
  const activeItemBg = darkMode 
    ? 'bg-gradient-to-r from-primary to-green-600 text-white shadow-lg shadow-primary/25' 
    : 'bg-gradient-to-r from-primary to-primary-600 text-white shadow-lg shadow-primary/25';

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 right-6 z-50 lg:hidden p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar Container - White bg in light mode, dark in dark mode */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`
          fixed left-0 top-0 bottom-0 z-50 
          bg-white dark:bg-dark-50/95 backdrop-blur-xl
          border-r border-light-border dark:border-white/[0.08]
          flex flex-col
          shadow-sidebar lg:shadow-none
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b ${darkMode ? 'border-white/[0.08]' : 'border-light-border'}`}>
<Link 
            to="/dashboard" 
            className="flex items-center gap-3 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary-400 to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden"
                >
                  <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-light-text'} whitespace-nowrap`}>
                    🌱 Zero Hunger AI
                  </span>
                  <span className={`block text-xs font-medium ${darkMode ? 'text-green-400' : 'text-primary'}`}>
                    AI-Powered Food Rescue Platform
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden lg:flex p-2 rounded-lg transition-all opacity-0 lg:opacity-100 group-hover:opacity-100 ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
          >
            {isCollapsed ? (
              <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            ) : (
              <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            )}
          </button>
        </div>

{/* AI Feature Banner */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r ${darkMode ? 'from-primary/20 via-green-500/20 to-accent/20 border border-primary/20' : 'from-primary-50 via-primary-100 to-accent-50 border border-primary-100'}`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Sparkles className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-primary'}`} />
                <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-primary'}`}>Powered by AI</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'}`}>
                UN SDG Goal 2
              </span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-light-text-secondary'}`}>
              Smart food matching & demand forecasting
            </p>
          </motion.div>
        )}

        {/* Navigation */}
        <nav 
          ref={navRef}
          className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin"
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${active 
                    ? activeItemBg
                    : `text-gray-400 dark:text-gray-400 ${darkMode ? 'hover:bg-white/[0.08] hover:text-white' : 'hover:bg-primary/5 hover:text-primary'}`
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                  {item.ai && (
                    <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse ${darkMode ? 'bg-green-400' : 'bg-primary'}`} />
                  )}
                </div>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between flex-1 min-w-0"
                    >
                      <span className="font-medium truncate">{item.name}</span>
                      {item.badge && (
                        <span className={`
                          text-xs px-2 py-0.5 rounded-full font-medium
                          ${active ? 'bg-white/20 text-white' : darkMode ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className={`p-3 border-t ${darkMode ? 'border-white/[0.08]' : 'border-light-border'} space-y-1`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`
              group flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full
              ${darkMode 
                ? 'text-gray-400 hover:bg-white/[0.08] hover:text-white' 
                : 'text-light-text-secondary hover:bg-primary/5 hover:text-primary'
              }
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? (darkMode ? 'Light Mode' : 'Dark Mode') : undefined}
          >
            {darkMode ? (
              <Sparkles className="w-5 h-5 flex-shrink-0 text-yellow-400" />
            ) : (
              <Activity className="w-5 h-5 flex-shrink-0 text-primary" />
            )}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  {darkMode ? '✨ Light Mode' : '🌙 Dark Mode'}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link
            to="/settings"
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${darkMode 
                ? 'text-gray-400 hover:bg-white/[0.08] hover:text-white' 
                : 'text-light-text-secondary hover:bg-primary/5 hover:text-primary'
              }
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Settings' : undefined}
            onClick={() => setMobileOpen(false)}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all w-full
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
