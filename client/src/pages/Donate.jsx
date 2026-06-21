import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed, MapPin, Calendar, Package, 
  Image, Loader2, Clock
} from 'lucide-react';
import { Card, Button, Input, Select, Textarea } from '../components/ui';
import { Sidebar } from '../components/layout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Donate = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    foodName: '',
    category: '',
    quantity: '',
    unit: 'kg',
    expiryDate: '',
    pickupAddress: '',
    description: '',
    foodType: 'vegetarian',
    packaging: 'packed'
  });
const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Theme-aware color constants - SPEC COMPLIANT
  const pageBg = darkMode ? 'bg-dark' : 'bg-light-bg-secondary';
  const cardBg = darkMode ? 'bg-dark-50/50 border-dark-100' : 'bg-white border-gray-100';
  const headingColor = darkMode ? 'text-white' : 'text-slate-900';
  const subheadingColor = darkMode ? 'text-gray-400' : 'text-slate-500';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSuccess(true);
  };

  const categoryOptions = [
    { value: 'vegetables', label: 'Fresh Vegetables' },
    { value: 'fruits', label: 'Fruits' },
    { value: 'grains', label: 'Grains & Cereals' },
    { value: 'proteins', label: 'Proteins (Meat/Fish)' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'bakery', label: 'Bread & Bakery' },
    { value: 'cooked', label: 'Cooked Food' },
    { value: 'other', label: 'Other' },
  ];

  const unitOptions = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'pieces', label: 'Pieces' },
    { value: 'plates', label: 'Plates' },
    { value: 'boxes', label: 'Boxes' },
  ];

return (
    <div className={`flex min-h-screen ${pageBg}`}>
      <Sidebar role="donor" />
      
      <main className="flex-1 ml-80 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${headingColor}`}>
            Donate Food
          </h1>
          <p className={subheadingColor}>
            Share surplus food with those who need it most
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donation Form */}
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
                    <UtensilsCrossed className={`w-10 h-10 ${darkMode ? 'text-green-500' : 'text-green-600'}`} />
                  </div>
                  <h2 className={`text-2xl font-bold mb-4 ${headingColor}`}>
                    Donation Submitted! 🎉
                  </h2>
                  <p className={`mb-8 ${subheadingColor}`}>
                    Thank you for your generous donation! We've notified nearby NGOs and volunteers. 
                    A volunteer will contact you for pickup details.
                  </p>
                  <Button 
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        foodName: '',
                        category: '',
                        quantity: '',
                        unit: 'kg',
                        expiryDate: '',
                        pickupAddress: '',
                        description: '',
                        foodType: 'vegetarian',
                        packaging: 'packed'
                      });
                    }}
                  >
                    Donate Another
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className={cardBg}>
                <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>Food Details</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Food Name / Description"
                    name="foodName"
                    placeholder="e.g., Fresh vegetables, Cooked rice"
                    icon={UtensilsCrossed}
                    value={formData.foodName}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      options={categoryOptions}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Quantity"
                        name="quantity"
                        type="number"
                        placeholder="Amount"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                      <Select
                        label="Unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        options={unitOptions}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      type="date"
                      icon={Calendar}
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />

                    <Select
                      label="Food Type"
                      name="foodType"
                      value={formData.foodType}
                      onChange={handleChange}
                      options={[
                        { value: 'vegetarian', label: 'Vegetarian' },
                        { value: 'non-vegetarian', label: 'Non-Vegetarian' },
                        { value: 'vegan', label: 'Vegan' },
                        { value: 'eggetarian', label: 'Eggitarian' },
                      ]}
                    />
                  </div>

                  <Input
                    label="Pickup Address"
                    name="pickupAddress"
                    placeholder="Complete address for pickup"
                    icon={MapPin}
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Packaging"
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleChange}
                      options={[
                        { value: 'packed', label: 'Already Packed' },
                        { value: 'loose', label: ' Loose / Bulk' },
                        { value: 'container', label: 'Bring Container' },
                      ]}
                    />

                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary"
                        />
<span className={`${subheadingColor} text-sm`}>Can arrange transportation</span>
                      </label>
                    </div>
                  </div>

                  <Textarea
                    label="Additional Notes"
                    name="description"
                    placeholder="Any special instructions for handling..."
                    value={formData.description}
                    onChange={handleChange}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    icon={Package}
                  >
                    Submit Donation
                  </Button>
                </form>
              </Card>
            )}
          </motion.div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
<Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>
                Donation Guidelines
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                    <span className={darkMode ? 'text-green-500' : 'text-green-600'}>✓</span>
                  </div>
                  <div>
                    <p className={`font-medium ${headingColor}`}>Fresh Food</p>
                    <p className={`text-sm ${subheadingColor}`}>Food should be fresh and safe to consume</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                    <span className={darkMode ? 'text-green-500' : 'text-green-600'}>✓</span>
                  </div>
                  <div>
                    <p className={`font-medium ${headingColor}`}>Proper Packaging</p>
                    <p className={`text-sm ${subheadingColor}`}>Use clean, food-grade containers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                    <span className={darkMode ? 'text-green-500' : 'text-green-600'}>✓</span>
                  </div>
                  <div>
                    <p className={`font-medium ${headingColor}`}>Label Clearly</p>
                    <p className={`text-sm ${subheadingColor}`}>Mention expiry date and contents</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center flex-shrink-0`}>
                    <span className={darkMode ? 'text-green-500' : 'text-green-600'}>✓</span>
                  </div>
                  <div>
                    <p className={`font-medium ${headingColor}`}>Safe Transport</p>
                    <p className={`text-sm ${subheadingColor}`}>Ensure proper handling during pickup</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className={`${cardBg} mt-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>
                What's Accepted
              </h3>
              <ul className={`space-y-2 text-sm ${subheadingColor}`}>
                <li>• Fresh vegetables & fruits</li>
                <li>• Cooked food (if fresh)</li>
                <li>• Packaged food (unopened)</li>
                <li>• Bread & bakery items</li>
                <li>• Dairy products (sealed)</li>
                <li>• Grains & cereals</li>
              </ul>
            </Card>

            <Card className={`${cardBg} mt-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>
                What's Not Accepted
              </h3>
              <ul className={`space-y-2 text-sm ${subheadingColor}`}>
                <li>• Expired food</li>
                <li>• Perished items</li>
                <li>• Half-eaten food</li>
                <li>• Open containers</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
