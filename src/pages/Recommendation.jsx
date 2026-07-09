import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Floating3DBackground from "../components/Floating3DBackground";
import { motion } from "framer-motion";
import {
  getPortfolio,
  generatePortfolio,
} from "../services/portfolioService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Recommendation() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
  
    async function load() {
      try {
        let data = await getPortfolio(user.id);

        if (!data.id) {
            await generatePortfolio(user.id);
            data = await getPortfolio(user.id);
        }

        setPortfolio(data);  
      } catch (err) {
        console.error(err);
        setPortfolio({});
      }
    }
  
    load();
  }, []);

  if (!portfolio || !portfolio.id) {
    return (
      <>
        <Navbar />
        <Floating3DBackground />
        <div className="min-h-screen flex items-center justify-center text-white relative z-10">
          <div className="text-center bg-slate-900/60 backdrop-blur-lg border border-white/10 p-10 rounded-2xl shadow-lg max-w-md">
            <h2 className="text-3xl font-black mb-3 text-red-400">
              No Portfolio Found
            </h2>
            <p className="text-gray-300 mb-6">
              Complete your assessment first to generate your AI portfolio.
            </p>
            <Link
              to="/assessment"
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl transition inline-block font-bold"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </>
    );
  }

  const chartData = [
    { name: "Stocks", value: portfolio.stocks },
    { name: "ETF", value: portfolio.etf },
    { name: "Bonds", value: portfolio.bonds },
    { name: "Gold", value: portfolio.gold },
    { name: "Cash", value: portfolio.cash },
  ];

  const COLORS = [
    "#6366f1", // indigo-500
    "#06b6d4", // cyan-500
    "#eab308", // yellow-500
    "#ec4899", // pink-500
    "#64748b"  // slate-500
  ];

  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen text-white relative z-10 py-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-indigo-300 bg-clip-text text-transparent tracking-tight mb-2">
            AI Portfolio Recommendation
          </h1>

          <p className="text-gray-400 mb-10 text-lg">
            This portfolio has been generated using your latest risk assessment.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Portfolio Allocation list */}
            <div className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6">
                Asset Allocation
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold text-gray-300">
                    <span>Stocks</span>
                    <span>{portfolio.stocks}%</span>
                  </div>
                  <div className="w-full bg-slate-950/60 rounded-full h-3 mt-2 border border-white/5">
                    <div
                      className="bg-indigo-500 h-3 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      style={{ width: `${portfolio.stocks}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-gray-300">
                    <span>ETFs</span>
                    <span>{portfolio.etf}%</span>
                  </div>
                  <div className="w-full bg-slate-950/60 rounded-full h-3 mt-2 border border-white/5">
                    <div
                      className="bg-cyan-500 h-3 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      style={{ width: `${portfolio.etf}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-gray-300">
                    <span>Bonds</span>
                    <span>{portfolio.bonds}%</span>
                  </div>
                  <div className="w-full bg-slate-950/60 rounded-full h-3 mt-2 border border-white/5">
                    <div
                      className="bg-yellow-500 h-3 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                      style={{ width: `${portfolio.bonds}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-gray-300">
                    <span>Gold</span>
                    <span>{portfolio.gold}%</span>
                  </div>
                  <div className="w-full bg-slate-950/60 rounded-full h-3 mt-2 border border-white/5">
                    <div
                      className="bg-pink-500 h-3 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                      style={{ width: `${portfolio.gold}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-gray-300">
                    <span>Cash</span>
                    <span>{portfolio.cash}%</span>
                  </div>
                  <div className="w-full bg-slate-950/60 rounded-full h-3 mt-2 border border-white/5">
                    <div
                      className="bg-slate-500 h-3 rounded-full shadow-[0_0_10px_rgba(100,116,139,0.5)]"
                      style={{ width: `${portfolio.cash}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart Card */}
            <div className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl flex flex-col justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent text-center mb-6">
                Portfolio Distribution
              </h2>

              <div className="flex-1 flex items-center justify-center p-4">
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index]}
                          stroke="rgba(255,255,255,0.05)"
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#0b0f19", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="glass-panel p-10 border border-white/5 shadow-2xl rounded-2xl mt-10">
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              AI Investment Insights
            </h2>

            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold">▶</span>
                <span>Maintain a diversified portfolio across multiple asset classes to lower systemic risk.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold">▶</span>
                <span>Invest consistently every month using Systematic Investment Plans (SIPs) to benefit from cost averaging.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold">▶</span>
                <span>Review and rebalance your portfolio every 6–12 months to match shift changes in target risk parameters.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold">▶</span>
                <span>Ensure an emergency fund is fully capitalized before expanding high-beta equity exposure.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold">▶</span>
                <span>Stay committed to your long-term roadmap and prevent emotional trading decisions during volatility spikes.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
}
