import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Package, Leaf, Activity, Globe } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { Sidebar } from '../components/layout';
import { useTheme } from '../context/ThemeContext';
import StatsCounter from '../components/ui/StatsCounter';

const donationData = [
  { month: 'Jan', donations: 420, meals: 8400 },
  { month: 'Feb', donations: 380, meals: 7600 },
  { month: 'Mar', donations: 510, meals: 10200 },
  { month: 'Apr', donations: 470, meals: 9400 },
  { month: 'May', donations: 580, meals: 11600 },
  { month: 'Jun', donations: 620, meals: 12400 },
];

const categoryData = [
  { name: 'Vegetables', value: 35, color: '#10B981' },
  { name: 'Grains', value: 25, color: '#3B82F6' },
  { name: 'Cooked Food', value: 20, color: '#F59E0B' },
  { name: 'Dairy', value: 12, color: '#8B5CF6' },
  { name: 'Other', value: 8, color: '#6B7280' },
];

const hungerData = [
  { region: 'North', index: 78, requests: 1240 },
  { region: 'South', index: 65, requests: 980 },
  { region: 'East', index: 72, requests: 1080 },
  { region: 'West', index: 58, requests: 870 },
  { region: 'Central', index: 82, requests: 1350 },
];

const Analytics = () => {
  const { darkMode } = useTheme();
  const [timeRange, setTimeRange] = useState('6m');

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
  // Growth indicators
  const positiveColor = darkMode ? 'text-green-500' : 'text-green-600';
  const chartGridColor = darkMode ? '#374151' : '#E2E8F0';
  const chartAxisColor = darkMode ? '#9CA3AF' : '#64748B';
  const chartTooltipBg = darkMode ? '#1F2937' : '#FFFFFF';

  const stats = [
    { label: 'Total Donations', value: '2,980', change: '+12%', icon: Package, color: 'primary' },
    { label: 'Meals Distributed', value: '59,600', change: '+18%', icon: Users, color: 'secondary' },
    { label: 'Food Saved (kg)', value: '15,400', change: '+8%', icon: Leaf, color: 'success' },
    { label: 'Carbon Reduced (kg)', value: '8,200', change: '+15%', icon: Globe, color: 'accent' },
  ];

return (
    <div className={`flex min-h-screen ${pageBg}`}>
      <Sidebar role="admin" />
      
      <main className="flex-1 ml-80 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${headingColor}`}>AI Analytics Dashboard</h1>
          <p className={subheadingColor}>Comprehensive platform analytics and insights</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
<motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cardBg}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${darkMode ? `bg-${stat.color}/20` : 'bg-gray-100'} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${darkMode ? `text-${stat.color}` : 'text-slate-600'}`} />
                  </div>
                  <Badge variant="success">{stat.change}</Badge>
                </div>
                <p className={`text-sm ${statLabelColor}`}>{stat.label}</p>
                {/* Large statistic value: 48px, font-weight 800 */}
                <StatsCounter end={parseInt(stat.value.replace(/,/g, ''))} className={statValueColor} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
<Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Donation Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={donationData}>
                  <defs>
                    <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="donations" stroke="#2E7D32" fillOpacity={1} fill="url(#colorDonations)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
<Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Food Category Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
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
                  <Tooltip contentStyle={{ backgroundColor: chartTooltipBg, border: 'none', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className={`text-sm ${statLabelColor}`}>{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Regional Hunger Index</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hungerData}>
<CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis dataKey="region" stroke={chartAxisColor} />
                  <YAxis stroke={chartAxisColor} />
                  <Tooltip contentStyle={{ backgroundColor: chartTooltipBg, border: 'none', borderRadius: '8px' }} />
                  <Bar dataKey="index" fill="#4CAF50" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
<Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Meals Delivered</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                  <XAxis dataKey="month" stroke={chartAxisColor} />
                  <YAxis stroke={chartAxisColor} />
                  <Tooltip contentStyle={{ backgroundColor: chartTooltipBg, border: 'none', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="meals" stroke="#FFC107" strokeWidth={2} dot={{ fill: '#FFC107' }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* AI Sustainability Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
<Card className={cardBg}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${headingColor}`}>AI Sustainability Score</h3>
                <p className={subheadingColor}>Overall platform impact rating</p>
              </div>
              <div className="text-right">
                <StatsCounter end={87} className={statValueColor} />
                <p className={`text-sm ${statLabelColor}`}>out of 100</p>
              </div>
            </div>
            <div className={`mt-4 h-3 ${darkMode ? 'bg-dark-100' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full" style={{ width: '87%' }} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <p className={`text-2xl font-bold ${statValueColor}`}>15,400 kg</p>
                <p className={`text-sm ${statLabelColor}`}>Food Saved</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${statValueColor}`}>2,980</p>
                <p className={`text-sm ${statLabelColor}`}>Donations</p>
              </div>
              <div className="text-center">
                <p className={`text-2xl font-bold ${statValueColor}`}>8,200 kg</p>
                <p className={`text-sm ${statLabelColor}`}>CO₂ Reduced</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Analytics;
