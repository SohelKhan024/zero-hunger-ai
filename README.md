# Zero Hunger AI 🌾🍽️

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-green" alt="Version">
  <img src="https://img.shields.io/badge/React-18.3.1-blue" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-green" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

An AI-powered web application aligned with **UN Sustainable Development Goal 2: Zero Hunger**. The platform helps reduce food wastage by connecting restaurants, hotels, event organizers, households, and NGOs with volunteers and people in need.

## 📋 Table of Contents

- [Features](#-features)
- [AI Features](#-ai-features)
- [Tech Stack](#-tech-stack)
- [Installation Guide](#-installation-guide)
- [Deployment Guide](#-deployment-guide)
- [Screenshots](#-screenshots)
- [Contributors](#-contributors)
- [License](#-license)

## ✨ Features

### 🌐 Core Functionality
- **Food Donation System** - Restaurants and households can easily donate surplus food
- **Food Request System** - NGOs and individuals can request food assistance
- **Volunteer Management** - Coordinate and track volunteer activities
- **NGO Coordination** - Network of verified partner NGOs
- **Real-time Notifications** - Socket.io powered instant updates
- **JWT Authentication** - Secure role-based access

### 📊 Dashboard & Analytics
- Role-based dashboards (Donor, NGO, Volunteer, Admin)
- Real-time analytics with interactive charts
- AI Sustainability Score
- Impact metrics visualization

### 🎨 UI/UX
- Modern glassmorphism design
- Dark/Light mode toggle
- Responsive design for all devices
- Smooth Framer Motion animations
- Professional SaaS-style interface

## 🤖 AI Features

| Feature | Description | Technology |
|---------|-------------|-------------|
| **Food Demand Prediction** | Predict food demand using Random Forest Regression | Machine Learning |
| **Hunger Hotspot Detection** | K-Means clustering to identify hunger hotspots | Clustering Algorithms |
| **Smart Food Matching** | AI-powered matching between donors and NGOs | Recommendation System |
| **AI Chatbot** | Intelligent assistant for platform guidance | Natural Language Processing |

## 🛠️ Tech Stack

### Frontend
<p align="left">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Framer_Motion-11.11.17-000000?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Recharts-2.13.3-000000?style=for-the-badge" alt="Recharts">
  <img src="https://img.shields.io/badge/React_Leaflet-4.2.1-000000?style=for-the-badge" alt="React Leaflet">
  <img src="https://img.shields.io/badge/Lucide_Icons-0.460.0-000000?style=for-the-badge" alt="Lucide Icons">
  <img src="https://img.shields.io/badge/React_Router-6.28.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
</p>

### Backend
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.21.0-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-6.9.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Socket.io-4.8.1-000000?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io">
  <img src="https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge" alt="JWT">
</p>

## 🚀 Installation Guide

### Prerequisites
- Node.js 18+
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/SohelKhan024/zero-hunger-ai.git
cd zero-hunger-ai
```

### Step 2: Install Frontend Dependencies
```bash
cd client
npm install
```

### Step 3: Install Backend Dependencies
```bash
cd ../server
npm install
```

### Step 4: Run the Application

**Start the Backend Server:**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Start the Frontend (in a new terminal):**
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

### Step 5: Open Your Browser
Navigate to `http://localhost:5173`

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Donor | john@example.com | demo123 |
| NGO | ngo@example.com | demo123 |
| Volunteer | volunteer@example.com | demo123 |
| Admin | admin@example.com | demo123 |

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   # Initialize git (if not already)
   git init
   git add .
   git commit -m "Zero Hunger AI Platform Initial Commit"
   
   # Create GitHub repository
   gh repo create zero-hunger-ai --public --source=. --description="AI-powered Zero Hunger Platform"
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

### Alternative: Deploying to Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure:
     - Base directory: `client`
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy"

## 📁 Project Structure

```
zero-hunger-ai/
├── client/                      # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── layout/        # Layout components (Navbar, Footer, Sidebar)
│   │   │   └── ui/            # UI components (Button, Card, Modal, etc.)
│   │   ├── pages/             # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Donate.jsx
│   │   │   ├── Requests.jsx
│   │   │   ├── AIChatbot.jsx
│   │   │   ├── AIPredictions.jsx
│   │   │   ├── HungerMap.jsx
│   │   │   └── Analytics.jsx
│   │   ├── context/           # React contexts (Auth, Theme, Notification)
│   │   ├── theme/            # Theme configuration
│   │   └── utils/            # Utility functions
│   ├── public/               # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                     # Node.js + Express backend
│   ├── server.js              # Main server file
│   ├── config/                # Configuration files
│   ├���─ models/                # Database models
│   ├── routes/                # API routes
│   ├── middleware/           # Custom middleware
│   └── utils/                 # Utility functions
│
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
├── vercel.json                 # Vercel configuration
├── netlify.toml               # Netlify configuration
└── LICENSE                    # License file
```

## 🖥️ Screenshots

### Landing Page
- Hero section with platform overview
- Feature highlights
- Impact statistics
- Call-to-action buttons

### Dashboard
- Role-based content
- Real-time analytics
- Quick actions
- Impact metrics

### AI Predictions
- Demand forecasting
- Interactive charts
- Trend analysis

### Hunger Map
- Geographic visualization
- Hotspot clustering
- NGO distribution

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [UN Sustainable Development Goal 2: Zero Hunger](https://sdgs.un.org/goals/goal2)
- Open source community
- All contributors and supporters

---

<p align="center">
  Made with ❤️ for a hunger-free world 🌏
</p>
