# Our Voice, Our Rights - MGNREGA Uttar Pradesh Tracker

A user-friendly web application that makes MGNREGA district performance data accessible to rural citizens with low data literacy.

## 🎯 Problem Statement
MGNREGA data, while available through government APIs, is technically complex and inaccessible to common people in rural districts who may not have high data literacy.

## ✨ Solution
- **Simple Language:** "Families Got Work" instead of "Households Employed"
- **Visual Data:** Charts and icons for easy understanding
- **Mobile First:** Responsive design for smartphone users
- **Auto-detection:** Location-based district identification
- **Production Ready:** Reliable static data instead of unstable APIs

## 🚀 Live Demo
- **Website:** [https://mgnrega-our-voice-our-rights-1.onrender.com]
- **API:** [https://mgnrega-our-voice-our-rights.onrender.com]

## 🛠️ Technical Architecture

### Frontend
- React.js with modern hooks
- Chart.js for data visualization
- Responsive CSS with glass morphism design
- Axios for API communication

### Backend
- Node.js + Express
- Static JSON data (production-ready)
- CORS configured for cross-origin requests
- Error handling and health checks

### Deployment
- Frontend: Render Static Site
- Backend: Render Web Service
- No database dependency (static JSON)

## 📊 Features
- District-wise MGNREGA performance
- Employment statistics visualization
- Beneficiary distribution charts
- 100-day completion tracking
- Mobile-responsive design
- Location-based district detection

## 🎨 Design Principles
- **Accessibility:** Simple language and icons
- **Performance:** Fast loading with static data
- **Reliability:** No external API dependencies
- **Scalability:** Ready for high traffic

## 🔧 Installation
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm start