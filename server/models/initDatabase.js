const db = require("../config/database");

const initializeDatabase = () => {

    db.serialize(() => {

        // USERS
        db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `);

        // ASSESSMENTS
        db.run(`
        CREATE TABLE IF NOT EXISTS assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            age INTEGER,
            income INTEGER,
            risk TEXT,
            goal TEXT,
            horizon INTEGER,
            monthlyInvestment INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        )
        `);

        // PORTFOLIOS
        db.run(`
        CREATE TABLE IF NOT EXISTS portfolios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            stocks INTEGER,
            etf INTEGER,
            bonds INTEGER,
            gold INTEGER,
            cash INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        )
        `);

        // WATCHLIST
        db.run(`
        CREATE TABLE IF NOT EXISTS watchlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            symbol TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        )
        `);

    });

    console.log("Database Initialized");
};

module.exports = initializeDatabase;

