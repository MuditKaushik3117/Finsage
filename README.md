# 💹 FinSage — Personalised Portfolio Intelligence

### *Invest Smarter. Grow Faster. Diversify Better.*

FinSage is a comprehensive, full-stack, AI-powered investment advisory platform designed to help users make optimized financial decisions. By evaluating user age, risk appetite, income, investment horizon, and personal financial goals, FinSage dynamically generates highly customized, diversified portfolio strategies. 

The application features a modern React/Vite-powered user interface with interactive data visualizations, real-time market tickers, and a robust Node.js/Express backend integrated with an SQLite database.

---

## 🎯 Core Features

### 1. 🤖 Dynamic Risk Assessment Engine
- Tailored questionnaire collecting key investor parameters: **Age, Annual Income, Risk Tolerance, Financial Goals, Investment Horizon, and Monthly Savings/SIP**.
- Algorithmic evaluation framework that determines asset distribution weights based on user risk profiles (Conservative, Moderate, Aggressive).

### 2. 📊 Premium Portfolio Dashboard
- **Interactive Visualizations**: High-fidelity charts (pie charts, line graphs, bar charts) built using **Recharts** and **Chart.js** displaying current asset allocation and future growth projections.
- **Detailed Asset Metrics**: Track allocations across 5 major asset classes: **Stocks, ETFs, Bonds, Gold, and Cash**.

### 3. 📈 Real-Time Market Analytics & Charting
- Integrated **TradingView** live charting widget to monitor asset ticker movements, technical indicators, and price trends directly from the dashboard.
- Live market indices and tickers tracking major global instruments.

### 4. 🛡️ Secure User Authentication
- Complete sign-up, login, and session preservation flows.
- Backend security driven by **JSON Web Tokens (JWT)** for route protection and session verification.
- Secure, one-way password hashing using **bcrypt** before database insertion.

### 5. 💬 AI Copilot (Chat Assistant)
- Real-time AI chat companion to answer portfolio questions, financial terms, or investment strategies.
- Personalized suggestions based on your generated portfolio.

### 6. 📂 Interactive Watchlist
- Add and track target ticker symbols.
- User-specific persistence stored directly in the SQLite database.

### 7. 📰 Live Financial News
- Real-time financial and business news stream powered by external APIs to keep you informed of global market events.

### 8. ⚖️ Portfolio Rebalancing Suggestions
- Compares your current holding allocations against target recommended strategies.
- Provides clear, actionable buy/sell triggers to re-align your investments to optimized risk thresholds.

### 9. 📄 Server-Side PDF Export (Reports & Presentations)
- Dynamic PDF creation engine powered by **PDFKit** on the Node.js backend.
- Generates a beautifully styled, multi-page financial health report and slideshow presentation including asset allocation lists, growth projection tables, and expert suggestions.

---

## 🛠 Tech Stack

### Frontend (Client-side)
* **Framework**: React 19 (Functional components, custom hooks, context-based state management)
* **Build System**: Vite 8 (Hot Module Replacement, ultra-fast builds)
* **Styling**: Tailwind CSS v4 (Sleek CSS architecture, modern dark mode themes, premium transitions)
* **Animations**: Framer Motion & AOS (Animate On Scroll) for high-performance micro-animations and smooth UI transitions
* **Data Visualization**: Recharts & Chart.js (Interactive pie, line, and doughnut charts)
* **Live Charts**: React-TS-Tradingview-Widgets (TradingView charts integration)

### Backend (Server-side)
* **Runtime**: Node.js
* **Framework**: Express (RESTful API architecture, clean routing, custom middleware)
* **Database**: SQLite3 (Local, lightweight relational database storing users, assessments, portfolios, and watchlists)
* **Authentication**: JWT (`jsonwebtoken`) & password hashing (`bcrypt`)
* **Security & Utils**: Helmet (HTTP headers protection), CORS (Cross-Origin Resource Sharing), Morgan (HTTP request logger)
* **PDF Engine**: PDFKit (for direct, formatted server-side PDF generation)

---

## 📂 Project Structure

```
FinSage/
│
├── server/                    # Node.js + Express Backend
│   ├── assets/                # Assets (logos, images for PDFs)
│   ├── config/                # Database and config files
│   ├── controllers/           # Route logic (Auth, Portfolio, PDF Report, News, etc.)
│   ├── database/              # SQLite DB storage (ignored in Git)
│   ├── middleware/            # JWT verification and route guards
│   ├── models/                # DB schema initialization
│   ├── routes/                # Express API endpoints
│   ├── .env                   # Server environment configurations
│   ├── .gitignore             # Git rules for backend assets/logs
│   ├── package.json           # Backend node dependencies
│   └── server.js              # Entry point for backend server
│
├── src/                       # React Frontend
│   ├── assets/                # App icons and media
│   ├── components/            # UI components (Navbar, Chart widgets, AI Assistant)
│   ├── context/               # React Auth contexts
│   ├── data/                  # Static constants and configurations
│   ├── pages/                 # Routing pages (Dashboard, Market, Watchlist, About, Home)
│   ├── services/              # API Client helpers connecting to Backend
│   ├── App.jsx                # Layout and route definitions
│   └── main.jsx               # React DOM initialization
│
├── .gitignore                 # Root level git rules
├── index.html                 # App HTML skeleton
├── package.json               # Root frontend dependencies
├── tailwind.config.js         # Styling configurations
└── README.md                  # This file
```

---

## 🚀 Installation & Local Setup

To run FinSage locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm or yarn

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/MuditKaushik3117/Finsage.git
cd Finsage
```

---

### Step 2: Configure Environment Variables

1. **Backend Environment Variables**:
   Create a `.env` file inside the `server/` directory:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_signing_secret_here
   FINNHUB_API_KEY=your_finnhub_api_key_here
   ```
   *(Note: You can get a free Finnhub API Key from [finnhub.io](https://finnhub.io/) for news and tickers).*

---

### Step 3: Run the Backend Server
```bash
# Navigate to the server folder
cd server

# Install backend dependencies
npm install

# Start the server (runs on Port 5000 by default)
npm run dev
```
You should see:
```
SQLite Database Connected
Database Initialized
🚀 Server running on port 5000
```

---

### Step 4: Run the Frontend Client
Open a **new terminal tab** in the root directory:
```bash
# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```
Open:
```
http://localhost:5173
```

---

## 👨‍💻 Project Development & Author

**Mudit Kaushik**
- B.Tech CSE (Cyber Security & Digital Forensics)
- UPES, Dehradun
- GitHub: [@MuditKaushik3117](https://github.com/MuditKaushik3117)

---

## 📄 License
This project is developed for educational purposes. Feel free to use, modify, and distribute for non-commercial projects.

---

*⭐ If you found this project helpful, feel free to give it a star on GitHub!*
