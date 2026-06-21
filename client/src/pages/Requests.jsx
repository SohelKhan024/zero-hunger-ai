import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HandHeart, MapPin, Users, Clock, CheckCircle,
  Loader2, AlertTriangle
} from 'lucide-react';
import { Card, Button, Input, Select, Textarea } from '../components/ui';
import { Sidebar } from '../components/layout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Requests = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    familySize: '',
    address: '',
    urgency: 'normal',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Theme-aware color constants - SPEC COMPLIANT
  const pageBg = darkMode ? 'bg-dark' : 'bg-light-bg-secondary';
  const cardBg = darkMode ? 'bg-dark-50/50 border-dark-100' : 'bg-white border-gray-100';
  const headingColor = darkMode ? 'text-white' : 'text-slate-900';
  const subheadingColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  const labelColor = darkMode ? 'text-gray-400' : 'text-slate-500';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

return (
    <div className={`flex min-h-screen ${pageBg}`}>
      <Sidebar role="donor" />
      
      <main className="flex-1 ml-80 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${headingColor}`}>Request Food</h1>
          <p className={subheadingColor}>Submit a food request for your family or community</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
{success ? (
              <Card className={cardBg}>
                <div className="text-center py-12">
                  <div className={`w-20 h-20 rounded-full ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center mx-auto mb-6`}>
                    <HandHeart className={`w-10 h-10 ${darkMode ? 'text-green-500' : 'text-green-600'}`} />
                  </div>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>Request Submitted!</h2>
                  <p className={`mb-8 ${subheadingColor}`}>
                    Your request has been prioritized. NGOs near you will be notified.
                  </p>
                  <Button onClick={() => setSuccess(false)}>Submit Another</Button>
                </div>
              </Card>
            ) : (
              <Card className={cardBg}>
                <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Request Details</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Select
                    label="Food Type Needed"
                    name="foodType"
                    value={formData.foodType}
                    onChange={handleChange}
                    options={[
                      { value: 'vegetables', label: 'Fresh Vegetables' },
                      { value: 'fruits', label: 'Fruits' },
                      { value: 'grains', label: 'Grains & Cereals' },
                      { value: 'cooked', label: 'Cooked Food' },
                      { value: 'mixed', label: 'Any Available' },
                    ]}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Quantity Needed"
                      name="quantity"
                      type="number"
                      placeholder="Amount in kg"
                    />
                    <Input
                      label="Family Size"
                      name="familySize"
                      type="number"
                      placeholder="Number of people"
                    />
                  </div>

                  <Input
                    label="Delivery Address"
                    name="address"
                    placeholder="Your address"
                    icon={MapPin}
                  />

                  <Select
                    label="Urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    options={[
                      { value: 'low', label: 'Within a week' },
                      { value: 'normal', label: 'Within 2-3 days' },
                      { value: 'high', label: 'Urgent - Today' },
                    ]}
                  />

                  <Textarea
                    label="Additional Notes"
                    name="notes"
                    placeholder="Any special requirements..."
                  />

                  <Button type="submit" className="w-full" loading={loading} icon={HandHeart}>
                    Submit Request
                  </Button>
                </form>
              </Card>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
<Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-primary/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                    <span className={darkMode ? 'text-primary' : 'text-green-600'}>1</span>
                  </div>
                  <div>
                    <p className={`font-medium ${headingColor}`}>Submit Request</p>
                    <p className={`text-sm ${subheadingColor}`}>Fill in your requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-primary/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                    <span className={darkMode ? 'text-primary' : 'text-green-600'}>2</span>
                  </div>
                  <div>
                    <p className={`font-medium ${headingColor}`}>AI Matching</p>
                    <p className={`text-sm ${subheadingColor}`}>We find nearby NGOs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-primary/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                    <span className={darkMode ? 'text-primary' : 'text-green-600'}>3</span>
                  </div>
                  <div>
                    <p className={`font-medium ${headingColor}`}>Delivery</p>
                    <p className={`text-sm ${subheadingColor}`}>Get food at your door</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Requests;
