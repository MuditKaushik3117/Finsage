require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const initializeDatabase = require("./models/initDatabase");
const assessmentRoutes = require("./routes/assessmentRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const marketRoutes = require("./routes/marketRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const newsRoutes=require("./routes/newsRoutes");
const reportRoutes = require("./routes/reportRoutes");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/news",newsRoutes);
app.use("/api/report", reportRoutes);

// Initialize SQLite
initializeDatabase();

app.get("/", (req, res) => {
    res.json({
        success: true,
        app: "FinSage Backend",
        database: "SQLite",
        message: "Backend running successfully 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});



