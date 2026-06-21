import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Users, Heart, TrendingUp, Clock, MapPin,
  DollarSign, UtensilsCrossed, Truck, AlertCircle,
  CheckCircle2, XCircle, Activity, Bot, Target, Award, Leaf,
  Brain, Zap, Gauge, Recycle, MessageCircle, X, Send, Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, 
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Card, Badge, Button } from '../components/ui';
import { Sidebar } from '../components/layout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import StatsCounter from '../components/ui/StatsCounter';

const Dashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  // Display name - use user name or fallback
  const displayName = user?.name?.trim() || "Food Hero";
  
  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  // Floating AI Assistant state
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { id: 1, role: 'assistant', content: `Hi ${displayName}! 👋 I'm your AI assistant. How can I help you today?` }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  
  const [stats, setStats] = useState({
    totalDonations: 1247,
    foodRequests: 892,
    activeNGOs: 45,
    hungerIndex: 67,
    mealsDelivered: 15420,
    pendingPickups: 23
  });
  
  // AI Impact Dashboard metrics
  const aiMetrics = {
    demandForecast: 156,
    matchingAccuracy: 94.7,
    mealsSavedToday: 423,
    sustainabilityScore: 87
  };
  
// Theme-aware color constants - SPEC COMPLIANT
  // Light Mode: Value=#0F172A, Label=#64748B
  // Dark Mode: Value=#FFFFFF, Label=#94A3B8
  const pageBg = darkMode ? 'bg-dark' : 'bg-light-bg-secondary';
  const cardBg = darkMode ? 'bg-dark-50/50 border-dark-100' : 'bg-white border-gray-100';
  const headingColor = darkMode ? 'text-white' : 'text-slate-900';
  const subheadingColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  // Statistic values: 48px, font-weight 800, color #0F172A (light) / #FFFFFF (dark)
  const statValueColor = darkMode ? 'text-white' : 'text-slate-900';
  // Card labels: 14px, color #64748B (light) / #94A3B8 (dark)
  const statLabelColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  const listItemBg = darkMode ? 'bg-dark-100/50' : 'bg-gray-50';
  const chartGridColor = darkMode ? '#334155' : '#E2E8F0';
  const chartAxisColor = darkMode ? '#94A3B8' : '#64748B';
  const chartTooltipBg = darkMode ? '#1E293B' : '#FFFFFF';
  const chartTooltipBorder = darkMode ? '#334155' : '#E2E8F0';
  // Growth indicators (positive=green, negative=red)
  const positiveColor = darkMode ? 'text-green-500' : 'text-green-600';
  const negativeColor = darkMode ? 'text-red-500' : 'text-red-600';

  const donationData = [
    { name: 'Jan', donations: 400, requests: 240 },
    { name: 'Feb', donations: 300, requests: 139 },
    { name: 'Mar', donations: 520, requests: 380 },
    { name: 'Apr', donations: 480, requests: 290 },
    { name: 'May', donations: 610, requests: 420 },
    { name: 'Jun', donations: 750, requests: 510 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 35, color: '#2E7D32' },
    { name: 'Fruits', value: 25, color: '#4CAF50' },
    { name: 'Grains', value: 20, color: '#81C784' },
    { name: 'Proteins', value: 15, color: '#FFC107' },
    { name: 'Dairy', value: 5, color: '#A5D6A7' },
  ];

  const recentDonations = [
    { id: 1, food: 'Fresh Vegetables', quantity: '50 kg', status: 'delivered', ngo: 'Food Bank ABC', date: '2 hours ago' },
    { id: 2, food: 'Rice & Pulses', quantity: '100 kg', status: 'pending', ngo: 'Care Foundation', date: '5 hours ago' },
    { id: 3, food: 'Fruits Box', quantity: '30 kg', status: 'assigned', ngo: 'Hope Foundation', date: '1 day ago' },
    { id: 4, food: 'Bread & Bakery', quantity: '200 pcs', status: 'picked', ngo: 'Meals for All', date: '1 day ago' },
  ];

  const recentRequests = [
    { id: 1, family: 'Ahmed Family', size: 5, location: 'Mumbai, Maharashtra', urgency: 'high', status: 'pending' },
    { id: 2, family: 'Sharma Family', size: 4, location: 'Delhi, NCR', urgency: 'medium', status: 'assigned' },
    { id: 3, family: 'Patel Family', size: 6, location: 'Ahmedabad, Gujarat', urgency: 'low', status: 'delivered' },
    { id: 4, family: 'Kumar Family', size: 3, location: 'Bangalore, Karnataka', urgency: 'high', status: 'pending' },
  ];

const role = user?.role || 'donor';

  // Simple AI response handler
  const getAIResponse = (input) => {
    const inp = input.toLowerCase();
    if (inp.includes('donate') || inp.includes('donation')) {
      return "To donate food, click on 'Donate Food' in the sidebar. You can specify the type, quantity, and pickup location. Our AI will match it with nearby NGOs!";
    }
    if (inp.includes('request') || inp.includes('need')) {
      return "To request food, go to 'Request Food' in the sidebar. Fill in your requirements and our AI will find matching donors near you.";
    }
    if (inp.includes('analytics') || inp.includes('report') || inp.includes('stats')) {
      return "Check the Analytics page for comprehensive reports on donations, meals distributed, and environmental impact!";
    }
    if (inp.includes('map') || inp.includes('hunger')) {
      return "Visit the Hunger Hotspots page to see AI-generated maps of areas with high food insecurity.";
    }
    return "I'm here to help! You can navigate to different pages using the sidebar, or ask me about donations, requests, analytics, and more.";
  };

  const handleAISend = async () => {
    if (!aiMessage.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: aiMessage,
      timestamp: new Date()
    };
    
    setAiMessages(prev => [...prev, userMsg]);
    setAiMessage('');
    setAiLoading(true);
    
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getAIResponse(aiMessage),
        timestamp: new Date()
      };
      setAiMessages(prev => [...prev, aiResponse]);
      setAiLoading(false);
    }, 800);
  };

  return (
<div className={`flex min-h-screen ${pageBg}`}>
      <Sidebar role={role} />
      
      <main className="flex-1 ml-80 p-8">
        {/* Header */}
<motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${headingColor}`}>
            {getGreeting()}, {displayName}! 👋
          </h1>
          <p className={subheadingColor}>
            Here's what's happening with your food donations today.
          </p>
        </motion.div>

        {/* AI Impact Dashboard - Animated Gradient Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className={`text-lg font-semibold mb-4 ${headingColor}`}>
            🤖 AI Impact Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* AI Demand Forecast */}
            <div className={`p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/20 border border-green-200 dark:border-green-700/30`}>
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300 font-medium">AI Demand Forecast</span>
              </div>
              <StatsCounter end={aiMetrics.demandForecast} suffix=" meals" className="text-3xl font-bold text-green-700 dark:text-green-300" />
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Predicted demand today</p>
            </div>
            
            {/* AI Matching Accuracy */}
            <div className={`p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-800/20 border border-blue-200 dark:border-blue-700/30`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">AI Matching</span>
              </div>
              <StatsCounter end={aiMetrics.matchingAccuracy} suffix="%" decimals={1} className="text-3xl font-bold text-blue-700 dark:text-blue-300" />
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Match accuracy</p>
            </div>
            
            {/* Meals Saved Today */}
            <div className={`p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-800/20 border border-amber-200 dark:border-amber-700/30`}>
              <div className="flex items-center gap-2 mb-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">Meals Saved</span>
              </div>
              <StatsCounter end={aiMetrics.mealsSavedToday} className="text-3xl font-bold text-amber-700 dark:text-amber-300" />
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Today</p>
            </div>
            
            {/* Sustainability Score */}
            <div className={`p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/20 border border-teal-200 dark:border-teal-700/30`}>
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span className="text-sm text-teal-700 dark:text-teal-300 font-medium">Sustainability</span>
              </div>
              <StatsCounter end={aiMetrics.sustainabilityScore} suffix="/100" className="text-3xl font-bold text-teal-700 dark:text-teal-300" />
              <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">AI Score</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={cardBg}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${statLabelColor}`}>Total Donations</p>
                  <StatsCounter end={stats.totalDonations} className={statValueColor} />
                </div>
                <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-primary/20' : 'bg-primary/10'} flex items-center justify-center`}>
                  <Package className="w-7 h-7 text-primary" />
                </div>
              </div>
<div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className={`w-4 h-4 ${positiveColor}`} />
                <span className={`font-semibold ${positiveColor}`}>+12%</span>
                <span className={subheadingColor}>from last month</span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={cardBg}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${statLabelColor}`}>Food Requests</p>
                  <StatsCounter end={stats.foodRequests} className={statValueColor} />
                </div>
                <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-accent/20' : 'bg-amber-100'} flex items-center justify-center`}>
                  <Heart className={`w-7 h-7 ${darkMode ? 'text-accent' : 'text-amber-600'}`} />
                </div>
              </div>
<div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className={`w-4 h-4 ${positiveColor}`} />
                <span className={`font-semibold ${positiveColor}`}>+8%</span>
                <span className={subheadingColor}>from last month</span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={cardBg}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${statLabelColor}`}>Active NGOs</p>
                  <StatsCounter end={stats.activeNGOs} className={statValueColor} />
                </div>
                <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center`}>
                  <Users className={`w-7 h-7 ${darkMode ? 'text-green-500' : 'text-green-600'}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className={`w-4 h-4 ${positiveColor}`} />
                <span className={`font-semibold ${positiveColor}`}>+5%</span>
                <span className={subheadingColor}>from last month</span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className={cardBg}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${statLabelColor}`}>Hunger Index</p>
                  <StatsCounter end={stats.hungerIndex} suffix="/100" className={statValueColor} />
                </div>
                <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center`}>
                  <AlertCircle className={`w-7 h-7 ${darkMode ? 'text-red-500' : 'text-red-600'}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <TrendingUp className={`w-4 h-4 ${negativeColor}`} />
                <span className={`font-semibold ${negativeColor}`}>+3%</span>
                <span className={subheadingColor}>needs attention</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Donation Trends */}
<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className={`${cardBg} h-96`}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Donation Trends</h3>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={donationData}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis dataKey="name" stroke={chartAxisColor} />
                  <YAxis stroke={chartAxisColor} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: chartTooltipBg, border: `1px solid ${chartTooltipBorder}`, borderRadius: '8px' }}
                    labelStyle={{ color: darkMode ? '#FFF' : '#0F172A' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="donations" stroke="#22C55E" fillOpacity={1} fill="url(#colorDonations)" name="Donations" />
                  <Area type="monotone" dataKey="requests" stroke="#F59E0B" fillOpacity={1} fill="url(#colorRequests)" name="Requests" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Food Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className={`${cardBg} h-96`}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Food Category Distribution</h3>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: chartTooltipBg, border: `1px solid ${chartTooltipBorder}`, borderRadius: '8px' }}
                    labelStyle={{ color: darkMode ? '#FFF' : '#0F172A' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className={cardBg}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${headingColor}`}>Recent Donations</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className={`flex items-center justify-between p-3 rounded-xl ${listItemBg}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-primary/20' : 'bg-primary/10'} flex items-center justify-center`}>
                        <UtensilsCrossed className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className={`font-medium ${headingColor}`}>{donation.food}</p>
                        <p className={`text-sm ${subheadingColor}`}>{donation.quantity} • {donation.date}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        donation.status === 'delivered' ? 'success' : 
                        donation.status === 'picked' ? 'info' : 
                        donation.status === 'assigned' ? 'warning' : 'danger'
                      }
                    >
                      {donation.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className={cardBg}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${headingColor}`}>Recent Requests</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className={`flex items-center justify-between p-3 rounded-xl ${listItemBg}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-accent/20' : 'bg-amber-100'} flex items-center justify-center`}>
                        <Heart className={`w-5 h-5 ${darkMode ? 'text-accent' : 'text-amber-600'}`} />
                      </div>
                      <div>
                        <p className={`font-medium ${headingColor}`}>{request.family}</p>
                        <p className={`text-sm ${subheadingColor} flex items-center gap-1`}>
                          <MapPin className="w-3 h-3" />
                          {request.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          request.status === 'delivered' ? 'success' : 
                          request.status === 'assigned' ? 'warning' : 'danger'
                        }
                      >
                        {request.status}
                      </Badge>
                      <p className={`text-sm mt-1 ${subheadingColor}`}>{request.size} people</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
</main>
      
      {/* Floating AI Assistant Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/ai-chatbot')}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-green-500 shadow-lg"
        style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' }}
      >
        <Bot className="w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
};

export default Dashboard;
