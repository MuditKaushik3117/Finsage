const PDFDocument = require("pdfkit");
const path = require("path");
const db = require("../config/database");

exports.generateReport = (req, res) => {
  const userId = req.params.userId;

  db.get(
    "SELECT * FROM users WHERE id=?",
    [userId],
    (err, user) => {
      if (err || !user)
        return res.status(500).json({ message: "User not found" });

      db.get(
        "SELECT * FROM assessments WHERE userId=? ORDER BY id DESC LIMIT 1",
        [userId],
        (err, assessment) => {
          if (err || !assessment)
            return res.status(500).json({ message: "Assessment not found" });

          db.get(
            "SELECT * FROM portfolios WHERE userId=? ORDER BY id DESC LIMIT 1",
            [userId],
            (err, portfolio) => {
              if (err || !portfolio)
                return res.status(500).json({ message: "Portfolio not found" });

              const doc = new PDFDocument({
                size: "A4",
                margin: 50
              });

              res.setHeader("Content-Type", "application/pdf");
              res.setHeader(
                "Content-Disposition",
                "attachment; filename=FinSage_Report.pdf"
              );

              doc.pipe(res);

              const logo = path.join(
                __dirname,
                "../assets/finsage-logo.png"
              );

              // ============================
              // COVER PAGE
              // ============================

              doc.rect(0, 0, 595, 842)
                .fill("#0F172A");

              doc.fillColor("white");

              try {
                doc.image(logo, 210, 70, {
                  width: 170
                });
              } catch {}

              doc
                .fontSize(34)
                .font("Helvetica-Bold")
                .text("FinSage", {
                  align: "center"
                });

              doc.moveDown(0.3);

              doc
                .fontSize(18)
                .fillColor("#60A5FA")
                .text("AI Portfolio Intelligence Report", {
                  align: "center"
                });

              doc.moveDown(2);

              doc.fillColor("white");

              doc
                .fontSize(22)
                .text("Prepared For", {
                  align: "center"
                });

              doc.moveDown();

              doc
                .fontSize(28)
                .font("Helvetica-Bold")
                .text(user.name, {
                  align: "center"
                });

              doc.moveDown();

              doc
                .fontSize(15)
                .fillColor("#CBD5E1")
                .text(user.email, {
                  align: "center"
                });

              doc.moveDown(8);

              doc
                .fontSize(14)
                .fillColor("white")
                .text(
                  `Generated on ${new Date().toLocaleDateString()}`,
                  {
                    align: "center"
                  }
                );

              doc.addPage();

              // ============================
              // HEADER
              // ============================

              doc.fillColor("#2563EB")
                .rect(0, 0, 595, 70)
                .fill();

              try {
                doc.image(logo, 40, 15, {
                  width: 40
                });
              } catch {}

              doc
                .fillColor("white")
                .fontSize(24)
                .font("Helvetica-Bold")
                .text("FinSage AI Report", 95, 23);

              doc.moveDown(3);

              // ============================
              // EXECUTIVE SUMMARY
              // ============================

              doc
                .fillColor("#0F172A")
                .fontSize(22)
                .text("Executive Summary");

              doc.moveDown();

              doc
                .fontSize(12)
                .fillColor("#475569")
                .text(
                  "FinSage analyzed your investment preferences, financial goals, and risk tolerance to generate a diversified portfolio designed for long-term wealth creation."
                );

              doc.moveDown(2);

              // ============================
              // USER INFO
              // ============================

              doc
                .fillColor("#2563EB")
                .fontSize(18)
                .text("Investor Profile");

              doc.moveDown();

              const profile = [
                ["Name", user.name],
                ["Email", user.email],
                ["Risk", assessment.risk],
                ["Goal", assessment.goal],
                ["Investment Horizon", `${assessment.horizon} Years`]
              ];

              profile.forEach((item) => {
                doc
                  .fillColor("#E2E8F0")
                  .roundedRect(doc.x, doc.y, 495, 28, 5)
                  .fill();

                doc
                  .fillColor("#0F172A")
                  .font("Helvetica-Bold")
                  .text(item[0], 60, doc.y + 8);

                doc
                  .font("Helvetica")
                  .text(item[1], 270, doc.y);

                doc.moveDown(1.8);
              });

              doc.moveDown();

              // ============================
              // PORTFOLIO
              // ============================

              doc
                .fillColor("#2563EB")
                .fontSize(18)
                .text("Recommended Portfolio");

              doc.moveDown();

              const assets = [
                ["Stocks", portfolio.stocks],
                ["ETF", portfolio.etf],
                ["Bonds", portfolio.bonds],
                ["Gold", portfolio.gold],
                ["Cash", portfolio.cash]
              ];

              assets.forEach((a) => {
                doc
                  .fillColor("#F8FAFC")
                  .roundedRect(doc.x, doc.y, 495, 30, 6)
                  .fill();

                doc
                  .fillColor("#0F172A")
                  .font("Helvetica-Bold")
                  .text(a[0], 60, doc.y + 8);

                doc
                  .fillColor("#10B981")
                  .text(`${a[1]}%`, 470, doc.y);

                doc.moveDown(1.8);
              });

              doc.moveDown(2);

              // ============================
              // AI INSIGHTS
              // ============================

              doc
                .fillColor("#2563EB")
                .fontSize(18)
                .text("AI Investment Insights");

              doc.moveDown();

              const insights = [
                "Diversify investments across multiple asset classes.",
                "Increase SIP by 10% every year.",
                "Maintain an emergency fund covering 6 months of expenses.",
                "Review and rebalance your portfolio every 12 months.",
                "Stay invested for long-term wealth creation."
              ];

              insights.forEach((tip) => {
                doc
                  .fillColor("#0F172A")
                  .fontSize(12)
                  .text("• " + tip);

                doc.moveDown(0.6);
              });

              doc.moveDown(2);

              // ============================
              // DISCLAIMER
              // ============================

              doc
                .fillColor("#64748B")
                .fontSize(10)
                .text(
                  "Disclaimer: This report is generated by FinSage AI for educational purposes. It should not be considered professional financial advice.",
                  {
                    align: "justify"
                  }
                );

              doc.moveDown(4);

              doc
                .fillColor("#94A3B8")
                .fontSize(10)
                .text(
                  `Generated by FinSage • ${new Date().toLocaleString()}`,
                  {
                    align: "center"
                  }
                );

              doc.end();
            }
          );
        }
      );
    }
  );
};

exports.generatePresentation = (req, res) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=FinSage_Presentation.pdf"
  );

  doc.pipe(res);

  const logo = path.join(__dirname, "../assets/finsage-logo.png");

  // Cover Slide
  doc.rect(0, 0, 595, 842).fill("#0B0F19");
  doc.fillColor("white");

  try {
    doc.image(logo, 222, 100, { width: 150 });
  } catch (e) {}

  doc.font("Helvetica-Bold")
    .fontSize(38)
    .fillColor("#FFFFFF")
    .text("FinSage", 50, 300, { align: "center" });

  doc.fontSize(20)
    .fillColor("#6366F1")
    .text("AI Portfolio Advisor & Market Terminal", { align: "center" });

  doc.moveDown(2);
  doc.fontSize(14)
    .fillColor("#9CA3AF")
    .text("Product Pitch & Technical Presentation", { align: "center" });

  doc.moveDown(5);
  doc.fontSize(11)
    .fillColor("#64748B")
    .text(`Generated on ${new Date().toLocaleDateString()} • Ready for Pitch`, { align: "center" });

  // Slide 2: Problem Statement
  doc.addPage();
  doc.rect(0, 0, 595, 842).fill("#0B0F19");
  doc.fillColor("#6366F1").rect(0, 0, 595, 60).fill();
  doc.fillColor("white").font("Helvetica-Bold").fontSize(18).text("01. The Problem Statement", 40, 22);

  doc.y = 120;
  doc.x = 40;

  const problems = [
    ["Retail Speculation vs. Allocation Strategy", "Most individual retail investors do not follow a structured, balanced asset framework. Instead, they either speculate on individual stock hype or keep capital locked in idle, zero-growth cash savings accounts."],
    ["Professional Access Barrier", "Traditional, high-quality wealth management services charge heavy advisory fees or set high minimum-capital requirements, effectively locking out standard retail savers and monthly contributors."],
    ["Unmanaged Portfolio Drift", "Market price fluctuations naturally cause asset weights to shift over time. However, calculating the exact offset calculations to rebalance back to safety limits is complex for everyday investors."]
  ];

  problems.forEach(([title, desc], idx) => {
    doc.fillColor("#1E293B").roundedRect(40, doc.y, 515, 85, 8).fill();
    
    doc.fillColor("#38BDF8").font("Helvetica-Bold").fontSize(14).text(`${idx + 1}. ${title}`, 60, doc.y + 12);
    doc.fillColor("#9CA3AF").font("Helvetica").fontSize(10).text(desc, 60, doc.y + 32, { width: 475, lineGap: 3 });
    
    doc.moveDown(6.2);
  });

  // Slide 3: Solution
  doc.addPage();
  doc.rect(0, 0, 595, 842).fill("#0B0F19");
  doc.fillColor("#06B6D4").rect(0, 0, 595, 60).fill();
  doc.fillColor("white").font("Helvetica-Bold").fontSize(18).text("02. The Solution (FinSage Features)", 40, 22);

  doc.y = 120;
  doc.x = 40;

  const solutions = [
    ["Dynamic Risk Profiling", "Collects demographic and savings capability metrics to isolate the investor's customized risk tolerance limits (High, Medium, Low)."],
    ["MPT-Driven Allocations", "Applies Modern Portfolio Theory parameters to split investment capital across Stocks, ETFs, Bonds, Gold, and Cash."],
    ["Automated Rebalancing Engine", "Compares current drifts against targets and outputs exact sell/buy percentage allocations to manage market risk."],
    ["Real-Time Market Widgets & Feeds", "Displays scrolling marquee banners, live company quote cards, and integrated TradingView charts."],
    ["AI Assistant Chat Copilot", "A floating glassmorphic chat widget answering conceptual doubts and explaining customized allocations."]
  ];

  solutions.forEach(([title, desc]) => {
    doc.fillColor("#1E293B").roundedRect(40, doc.y, 515, 55, 6).fill();
    
    doc.fillColor("#34D399").font("Helvetica-Bold").fontSize(11).text(`✔  ${title}`, 60, doc.y + 10);
    doc.fillColor("#D1D5DB").font("Helvetica").fontSize(9).text(desc, 60, doc.y + 24, { width: 475 });
    
    doc.moveDown(4.2);
  });

  // Slide 4: Tech Stack
  doc.addPage();
  doc.rect(0, 0, 595, 842).fill("#0B0F19");
  doc.fillColor("#EC4899").rect(0, 0, 595, 60).fill();
  doc.fillColor("white").font("Helvetica-Bold").fontSize(18).text("03. The Technical Architecture", 40, 22);

  doc.y = 120;
  doc.x = 40;

  const techStack = [
    ["Frontend Interface", "React (Vite SPA) styled with standard Tailwind CSS using glassmorphism backdrops, glowing boundaries, and Framer Motion spring physics/tilts."],
    ["Data Visuals & Charts", "Chart.js and Recharts engines rendering allocations and historical progress; TradingView widgets displaying real-time candles."],
    ["Server-Side REST API", "Express.js (Node.js) handling route middleware, session authentication with JWT, and password encryption using bcrypt."],
    ["Relational Data Storage", "SQLite3 local engine storing credentials, user metrics, watchlist tickers, and recommended portfolio weights."],
    ["External Connections", "Finnhub API integrating live stock quotes, exchange profiles, and actual financial headline news feeds."]
  ];

  techStack.forEach(([title, desc]) => {
    doc.fillColor("#1E293B").roundedRect(40, doc.y, 515, 55, 6).fill();
    
    doc.fillColor("#F472B6").font("Helvetica-Bold").fontSize(11).text(`⚙  ${title}`, 60, doc.y + 10);
    doc.fillColor("#D1D5DB").font("Helvetica").fontSize(9).text(desc, 60, doc.y + 24, { width: 475 });
    
    doc.moveDown(4.2);
  });

  // Slide 5: Concepts
  doc.addPage();
  doc.rect(0, 0, 595, 842).fill("#0B0F19");
  doc.fillColor("#10B981").rect(0, 0, 595, 60).fill();
  doc.fillColor("white").font("Helvetica-Bold").fontSize(18).text("04. Scientific Financial Concepts", 40, 22);

  doc.y = 120;
  doc.x = 40;

  const financeConcepts = [
    ["Modern Portfolio Theory (MPT)", "Optimizes asset class weightings along the Efficient Frontier (Harry Markowitz) to offer the maximum expected yield per unit of risk volatility."],
    ["Volatility Offset Rebalancing", "Trimming overweight assets (selling high) and accumulating underweight assets (buying low) when portfolio allocations drift during market cycles."],
    ["Sharpe Ratio Efficiency", "Measures excess returns relative to portfolio standard deviation. FinSage targets a strong Sharpe Ratio (1.87), indicating elite asset efficiency."],
    ["SIP & Cost Averaging", "FinSage structures monthly savings inputs via SIPs to mitigate market entry timing risks and leverage rupee-cost averaging parameters."]
  ];

  financeConcepts.forEach(([title, desc]) => {
    doc.fillColor("#1E293B").roundedRect(40, doc.y, 515, 85, 8).fill();
    
    doc.fillColor("#34D399").font("Helvetica-Bold").fontSize(13).text(`✦  ${title}`, 60, doc.y + 12);
    doc.fillColor("#9CA3AF").font("Helvetica").fontSize(9.5).text(desc, 60, doc.y + 30, { width: 475, lineGap: 2.5 });
    
    doc.moveDown(6.2);
  });

  doc.end();
};



