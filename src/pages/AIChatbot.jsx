import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Send, Mic, MicOff, Trash2, 
  MessageCircle, Sparkles, Loader2
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { Sidebar } from '../components/layout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const AIChatbot = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello ${user?.name || 'there'}! 👋 I'm Zero Hunger AI Assistant. How can I help you today? You can ask me about:\n\n🍽️ Food donation process\n🏢 NGO information\n🤝 Volunteer opportunities\n📊 Platform analytics\n🌍 Hunger awareness\n\nJust type your question below!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Theme-aware color constants - SPEC COMPLIANT
  const pageBg = darkMode ? 'bg-dark' : 'bg-light-bg-secondary';
  const cardBg = darkMode ? 'bg-dark-50/50 border-dark-100' : 'bg-white border-gray-100';
  const headingColor = darkMode ? 'text-white' : 'text-slate-900';
  const subheadingColor = darkMode ? 'text-gray-400' : 'text-slate-500';
  const borderColor = darkMode ? 'border-dark-100' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-dark-100' : 'bg-gray-100';
  const inputText = darkMode ? 'text-white' : 'text-slate-900';
  const inputPlaceholder = darkMode ? 'text-gray-500' : 'text-slate-400';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Simple rule-based responses for demo
    if (input.includes('donate') || input.includes('donation')) {
      return `Great question about donating food! Here's how it works:\n\n1. Click "Donate Food" button\n2. Enter food details (type, quantity, expiry)\n3. Provide pickup address\n4. Our AI will match you with nearby NGOs\n5. Schedule a pickup\n\nWould you like me to guide you through the donation process?`;
    }
    
    if (input.includes('ngo') || input.includes('organization')) {
      return `We work with verified NGOs across India! Here are some popular ones:\n\n🏠 Food Bank Foundation\n🌾 Care Foundation\n💚 Hope Foundation\n🍞 Meals for All\n\nNGOs can register on our platform to receive donations and manage their food inventory. Would you like to know more about becoming an NGO partner?`;
    }
    
    if (input.includes('volunteer') || input.includes('join')) {
      return `Thank you for wanting to volunteer! As a volunteer, you can:\n\n🚚 Pickup food from donors\n🏃 Deliver to NGOs\n📍 Track your routes\n🎯 Earn impact points\n\nTo become a volunteer, register with your details and complete our orientation. Would you like to sign up?`;
    }
    
    if (input.includes('impact') || input.includes('stats') || input.includes('how much')) {
      return `Here's our impact so far:\n\n🍽️ 125,000+ meals saved\n🌍 250+ NGOs connected\n👥 5,000+ active volunteers\n♻️ 75% food waste reduced\n\nYour donations make a real difference! Every meal donated helps someone in need.`;
    }
    
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return `Hello ${user?.name || 'there'}! 👋 How can I assist you today?`;
    }
    
    if (input.includes('thank')) {
      return `You're welcome! 😊 We're here to help. Is there anything else you'd like to know about Zero Hunger AI?`;
    }
    
    if (input.includes('help')) {
      return `I can help you with:\n\n🍽️ Food donation guidance\n🏢 NGO information\n🤝 Volunteer opportunities\n📊 Platform analytics\n🌍 Hunger awareness tips\n🎯 Donation suggestions\n\nJust ask me anything!`;
    }
    
    // Default response
    return `That's a great question! Let me connect you with the right information.\n\nBased on your query, I can offer these options:\n\n1. Visit our Dashboard for detailed analytics\n2. Check the AI Predictions page for demand forecasts\n3. Browse the Hunger Map for hotspot analysis\n4. Contact our support team for specific assistance\n\nWould you like me to elaborate on any of these?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: `Chat cleared! How can I help you now?`,
        timestamp: new Date()
      }
    ]);
  };

  const suggestedQuestions = [
    'How do I donate food?',
    'Which NGOs are working near me?',
    'How can I become a volunteer?',
    'What is your impact so far?'
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
            AI Chat Assistant
          </h1>
          <p className={subheadingColor}>
            Get instant support and guidance powered by artificial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className={`${cardBg} h-[600px] flex flex-col`}>
              {/* Chat Header */}
              <div className={`flex items-center justify-between pb-4 border-b ${borderColor}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-primary/20' : 'bg-primary/10'} flex items-center justify-center`}>
                    <Bot className={`w-5 h-5 ${darkMode ? 'text-primary' : 'text-primary'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${headingColor}`}>Zero Hunger Assistant</h3>
                    <p className={`text-sm flex items-center gap-1 ${subheadingColor}`}>
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  icon={Trash2}
                  onClick={clearChat}
                >
                  Clear
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-primary text-white rounded-br-md'
                            : darkMode 
                              ? 'bg-dark-100 text-white rounded-bl-md' 
                              : 'bg-gray-100 text-slate-900 rounded-bl-md'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="w-4 h-4 text-primary" />
                            <span className="text-xs text-primary">AI Assistant</span>
                          </div>
                        )}
                        <p className="whitespace-pre-line text-sm">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-white/70' : subheadingColor
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`p-4 rounded-2xl rounded-bl-md ${darkMode ? 'bg-dark-100' : 'bg-gray-100'}`}>
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                        <span className={subheadingColor + " text-sm"}>Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className={`pt-4 border-t ${borderColor}`}>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className={`flex-1 px-4 py-3 rounded-xl ${inputBg} ${borderColor} ${inputText} ${inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  <Button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    icon={Send}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={cardBg}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Suggested Questions</h3>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(question);
                    }}
                    className={`w-full p-3 text-left text-sm rounded-xl transition-colors ${
                      darkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-dark-100' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Card>

            <Card className={`${cardBg} mt-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Quick Actions</h3>
              <div className="space-y-2">
                <button className={`w-full p-3 text-left text-sm rounded-xl transition-colors flex items-center gap-2 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-dark-100' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }`}>
                  <MessageCircle className="w-4 h-4" />
                  Start New Chat
                </button>
                <button className={`w-full p-3 text-left text-sm rounded-xl transition-colors flex items-center gap-2 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-dark-100' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }`}>
                  <Sparkles className="w-4 h-4" />
                  AI Suggestions
                </button>
              </div>
            </Card>

            <Card className={`${cardBg} mt-6`}>
              <h3 className={`text-lg font-semibold mb-4 ${headingColor}`}>Chat History</h3>
              <p className={`${subheadingColor} text-sm`}>No previous chats</p>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AIChatbot;
