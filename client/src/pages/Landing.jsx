import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Heart, Users, Package, MapPin, 
  Bot, TrendingUp, Shield, Zap, Leaf,
  UtensilsCrossed, HandHeart, BarChart3
} from 'lucide-react';
import { Button } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import StatsCounter from '../components/ui/StatsCounter';

const Landing = () => {
  const { darkMode } = useTheme();
  const statsRef = useRef(null);

  const features = [
    {
      icon: TrendingUp,
      title: 'AI Food Prediction',
      description: 'Predict food demand with advanced machine learning algorithms for optimal distribution.'
    },
    {
      icon: MapPin,
      title: 'Hunger Heatmap',
      description: 'Identify hunger hotspots using K-means clustering to prioritize aid distribution.'
    },
    {
      icon: HandHeart,
      title: 'Smart Food Matching',
      description: 'Automatically match donors with nearby NGOs based on location, food type, and expiry.'
    },
    {
      icon: Bot,
      title: 'AI Chat Assistant',
      description: 'Get instant support and guidance through our intelligent chatbot powered by AI.'
    },
    {
      icon: Users,
      title: 'NGO Management',
      description: 'Comprehensive NGO verification and management system for trusted partnerships.'
    },
    {
      icon: Package,
      title: 'Volunteer Tracking',
      description: 'Track volunteer activities and optimize delivery routes with GPS routing.'
    }
  ];

  const stats = [
    { value: 125000, suffix: '+', label: 'Meals Saved' },
    { value: 8500, suffix: 'kg', label: 'Food Donated' },
    { value: 250, suffix: '+', label: 'NGOs Connected' },
    { value: 5000, suffix: '+', label: 'Active Volunteers' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Solution</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6">
              <span className="gradient-text">Zero Hunger</span> AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Connecting surplus food with those who need it most through artificial intelligence. 
              Join us in ending food waste and hunger.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="xl" icon={UtensilsCrossed}>
                  Donate Food
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="xl" icon={HandHeart}>
                  Request Food
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="accent" size="xl" icon={BarChart3}>
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white dark:bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <StatsCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="justify-center"
                />
                <p className="mt-2 text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Leverage cutting-edge artificial intelligence to maximize food donation impact
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="card glass-card"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-white dark:bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Together we're making a real difference in the fight against hunger
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card text-center"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-4xl font-bold gradient-text mb-2">50,000+</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Total People Fed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card text-center"
            >
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-4xl font-bold gradient-text mb-2">75%</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">Food Waste Reduced</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card text-center"
            >
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-4xl font-bold gradient-text mb-2">120 tons</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">CO₂ Emissions Saved</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Join the Movement
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Every meal donated brings us closer to a hunger-free world. 
              Start making a difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="accent" size="xl">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
