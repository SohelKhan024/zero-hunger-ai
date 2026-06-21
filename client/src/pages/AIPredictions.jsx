import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, MapPin, Calendar, Cloud, Users, 
  Loader2, ArrowRight, RefreshCw
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, Button, Input, Select } from '../components/ui';
import { Sidebar } from '../components/layout';
import StatsCounter from '../components/ui/StatsCounter';
import { useTheme } from '../context/ThemeContext';

const AIPredictions = () => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  
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
  const negativeColor = darkMode ? 'text-red-500' : 'text-red-600';
  const chartGridColor = darkMode ? '#334155' : '#E2E8F0';
  const chartAxisColor = darkMode ? '#94A3B8' : '#64748B';
  const chartTooltipBg = darkMode ? '#1E293B' : '#FFFFFF';
  const chartTooltipBorder = darkMode ? '#334155' : '#E2E8F0';
  
  const [formData, setFormData] = useState({
    location: '',
    population: '',
    previousRequests: '',
    date: '',
    weather: 'sunny'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const predictDemand = () => {
    setLoading(true);
    // Simulate AI prediction
    setTimeout(() => {
      const basePred = parseInt(formData.population) * 0.05 + parseInt(formData.previousRequests) * 0.3;
      const weatherMod = formData.weather === 'rainy' ? 1.3 : formData.weather === 'cloudy' ? 1.1 : 1;
      const result = Math.round(basePred * weatherMod);
      
      setPrediction({
        demand: result,
        confidence: 85 + Math.random() * 10,
        trend: result > parseInt(formData.previousRequests) ? 'increasing' : 'decreasing',
        peakTime: '12:00 - 14:00',
        recommended: Math.round(result * 1.2)
      });
      setLoading(false);
    }, 2000);
  };

  const predictionHistory = [
    { date: '01', actual: 120, predicted: 115 },
    { date: '02', actual: 135, predicted: 130 },
    { date: '03', actual: 128, predicted: 125 },
    { date: '04', actual: 142, predicted: 140 },
    { date: '05', actual: 156, predicted: 150 },
    { date: '06', actual: 165, predicted: 160 },
    { date: '07', actual: 178, predicted: 175 },
  ];

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny' },
    { value: 'cloudy', label: 'Cloudy' },
    { value: 'rainy', label: 'Rainy' },
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
          <h1 className={`text-3xl font-bold mb-2 ${headingColor}`}>
            AI Food Demand Prediction
          </h1>
          <p className={subheadingColor}>
            Predict food demand using Random Forest Regression algorithm
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Input Parameters</h3>
              
              <div className="space-y-4">
                <Select
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  options={[
                    { value: 'mumbai', label: 'Mumbai, Maharashtra' },
                    { value: 'delhi', label: 'Delhi, NCR' },
                    { value: 'bangalore', label: 'Bangalore, Karnataka' },
                    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
                  ]}
                />

                <Input
                  label="Population"
                  name="population"
                  type="number"
                  placeholder="Enter population"
                  icon={Users}
                  value={formData.population}
                  onChange={handleChange}
                />

                <Input
                  label="Previous Requests"
                  name="previousRequests"
                  type="number"
                  placeholder="Last month requests"
                  icon={TrendingUp}
                  value={formData.previousRequests}
                  onChange={handleChange}
                />

                <Input
                  label="Date"
                  name="date"
                  type="date"
                  icon={Calendar}
                  value={formData.date}
                  onChange={handleChange}
                />

                <Select
                  label="Weather Condition"
                  name="weather"
                  value={formData.weather}
                  onChange={handleChange}
                  options={weatherOptions}
                />

<Button 
                  className="w-full mt-6"
                  onClick={predictDemand}
                  loading={loading}
                  icon={prediction ? RefreshCw : ArrowRight}
                >
                  {prediction ? 'Retrain & Predict' : 'Predict Demand'}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {prediction ? (
              <>
{/* Prediction Result */}
                <Card className={`${cardBg} mb-6`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-primary/10' : 'bg-green-50'}`}>
                      <p className={`text-sm mb-2 ${statLabelColor}`}>Predicted Demand</p>
                      <StatsCounter end={prediction.demand} suffix=" meals" className={statValueColor} />
                    </div>
                    <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-accent/10' : 'bg-amber-50'}`}>
                      <p className={`text-sm mb-2 ${statLabelColor}`}>Confidence</p>
                      <StatsCounter end={prediction.confidence} suffix="%" decimals={1} className={darkMode ? 'text-accent' : 'text-amber-600'} />
                    </div>
                    <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-green-500/10' : 'bg-green-50'}`}>
                      <p className={`text-sm mb-2 ${statLabelColor}`}>Trend</p>
                      <p className={`text-2xl font-bold ${prediction.trend === 'increasing' ? positiveColor : negativeColor}`}>
                        {prediction.trend === 'increasing' ? '↑ Increasing' : '↓ Decreasing'}
                      </p>
                    </div>
                    <div className={`text-center p-4 rounded-xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                      <p className={`text-sm mb-2 ${statLabelColor}`}>Peak Time</p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{prediction.peakTime}</p>
                    </div>
                  </div>
                </Card>

{/* Prediction Chart */}
                <Card className={cardBg}>
                  <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Prediction vs Actual</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={predictionHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                      <XAxis dataKey="date" stroke={chartAxisColor} />
                      <YAxis stroke={chartAxisColor} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: chartTooltipBg, border: `1px solid ${chartTooltipBorder}`, borderRadius: '8px' }}
                        labelStyle={{ color: darkMode ? '#FFF' : '#0F172A' }}
                      />
                      <Bar dataKey="predicted" fill="#4CAF50" name="Predicted" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actual" fill="#2E7D32" name="Actual" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </>
            ) : (
              <Card className={`${cardBg} h-96 flex items-center justify-center`}>
                <div className="text-center">
                  <TrendingUp className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-primary/30' : 'text-green-300'}`} />
                  <p className={subheadingColor}>Enter parameters and click Predict to see results</p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AIPredictions;
