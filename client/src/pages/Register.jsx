import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, Phone, MapPin, Loader2, ArrowLeft, UtensilsCrossed, Building2, Truck } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'donor',
    organization: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (formData.name && formData.email && formData.password) {
        const user = {
          id: '1',
          name: formData.name,
          email: formData.email,
          role: formData.role,
          phone: formData.phone,
          address: formData.address,
          organization: formData.organization
        };
        login(user, 'demo-token');
        navigate('/dashboard');
      } else {
        setError('Please fill in all required fields');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleCards = [
    { 
      value: 'donor', 
      label: 'Food Donor', 
      icon: UtensilsCrossed,
      description: 'Share surplus food with those in need'
    },
    { 
      value: 'ngo', 
      label: 'NGO / Organization', 
      icon: Building2,
      description: 'Receive and distribute food donations'
    },
    { 
      value: 'volunteer', 
      label: 'Volunteer', 
      icon: Truck,
      description: 'Help pick up and deliver food'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Back to Home */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <Link to="/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
            Already have an account? <span className="font-medium text-primary">Sign in</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="card glass p-8">
            {/* Logo - Clickable to Home */}
            <div className="text-center mb-6">
              <Link to="/" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white" />
                </div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">
                Create your account
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Start making a difference today
              </p>
            </div>

            {/* Role Selection Cards */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                I want to join as a
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roleCards.map((role) => {
                  const Icon = role.icon;
                  const isSelected = formData.role === role.value;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleRoleSelect(role.value)}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-300 text-center
                        ${isSelected 
                          ? 'border-primary bg-primary/10 shadow-glow' 
                          : 'border-gray-200 dark:border-dark-100 hover:border-primary/50'
                        }
                      `}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium block ${isSelected ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                icon={User}
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="name@example.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                icon={Phone}
                value={formData.phone}
                onChange={handleChange}
              />

              {(formData.role === 'ngo' || formData.role === 'volunteer') && (
                <Input
                  label="Organization Name"
                  name="organization"
                  type="text"
                  placeholder="Enter organization name"
                  icon={Building2}
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
              )}

              <Input
                label="Address"
                name="address"
                type="text"
                placeholder="Enter your address"
                icon={MapPin}
                value={formData.address}
                onChange={handleChange}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary-700">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={loading}
              >
                Create Account
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
