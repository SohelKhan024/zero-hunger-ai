import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'zero-hunger-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());

// Demo data
const demoUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'donor', password: 'demo123' },
  { id: 2, name: 'NGO Admin', email: 'ngo@example.com', role: 'ngo', password: 'demo123' },
  { id: 3, name: 'Volunteer', email: 'volunteer@example.com', role: 'volunteer', password: 'demo123' },
  { id: 4, name: 'Admin User', email: 'admin@example.com', role: 'admin', password: 'demo123' },
];

const demoDonations = [
  { id: 1, foodName: 'Fresh Vegetables', quantity: 50, unit: 'kg', status: 'available', donorId: 1, category: 'vegetables', expiryDate: '2024-12-20' },
  { id: 2, foodName: 'Cooked Rice', quantity: 100, unit: 'plates', status: 'available', donorId: 1, category: 'cooked', expiryDate: '2024-12-15' },
  { id: 3, foodName: 'Bread', quantity: 20, unit: 'kg', status: 'assigned', donorId: 2, category: 'bakery', expiryDate: '2024-12-18' },
];

const demoRequests = [
  { id: 1, foodType: 'vegetables', quantity: 30, unit: 'kg', status: 'pending', userId: 5, familySize: 5, urgency: 'normal' },
  { id: 2, foodType: 'grains', quantity: 20, unit: 'kg', status: 'fulfilled', userId: 6, familySize: 4, urgency: 'high' },
];

const demoAnalytics = {
  totalDonations: 2980,
  mealsDelivered: 59600,
  foodSaved: 15400,
  carbonReduced: 8200,
  activeNGOs: 156,
  activeVolunteers: 523,
};

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = demoUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = {
    id: demoUsers.length + 1,
    name,
    email,
    role: role || 'donor',
    password
  };
  demoUsers.push(newUser);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

// Donation routes
app.get('/api/donations', (req, res) => {
  res.json(demoDonations);
});

app.post('/api/donations', (req, res) => {
  const newDonation = {
    id: demoDonations.length + 1,
    ...req.body,
    status: 'available',
    createdAt: new Date()
  };
  demoDonations.push(newDonation);
  io.emit('newDonation', newDonation);
  res.json({ success: true, donation: newDonation });
});

app.put('/api/donations/:id', (req, res) => {
  const { id } = req.params;
  const index = demoDonations.findIndex(d => d.id === parseInt(id));
  if (index !== -1) {
    demoDonations[index] = { ...demoDonations[index], ...req.body };
    io.emit('donationUpdated', demoDonations[index]);
    res.json({ success: true, donation: demoDonations[index] });
  } else {
    res.status(404).json({ success: false, message: 'Donation not found' });
  }
});

// Request routes
app.get('/api/requests', (req, res) => {
  res.json(demoRequests);
});

app.post('/api/requests', (req, res) => {
  const newRequest = {
    id: demoRequests.length + 1,
    ...req.body,
    status: 'pending',
    createdAt: new Date()
  };
  demoRequests.push(newRequest);
  io.emit('newRequest', newRequest);
  res.json({ success: true, request: newRequest });
});

// Analytics routes
app.get('/api/analytics', (req, res) => {
  res.json(demoAnalytics);
});

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
  
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zero Hunger AI API is running' });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
