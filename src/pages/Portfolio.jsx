import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Floating3DBackground from "../components/Floating3DBackground";
import { getPortfolio, generatePortfolio } from "../services/portfolioService";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Portfolio() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  async function loadPortfolio() {
    try {
      let data = await getPortfolio(user.id);
      if (!data.id) {
        await generatePortfolio(user.id);
        data = await getPortfolio(user.id);
      }
      setPortfolio(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const downloadReport = async () => {
    if (!user || !user.id) {
      alert("User not logged in.");
      return;
    }

    try {
      setDownloading(true);
      const response = await fetch(`http://localhost:5000/api/report/${user.id}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "FinSage_Report.pdf");
      document.body.appendChild(link);
      link.click();
      
      // Clean up DOM and memory
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Download error:", error);
      alert("Unable to download the report as a PDF file. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    if (user) loadPortfolio();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            <h1 className="text-xl font-bold">Loading Portfolio...</h1>
          </div>
        </div>
      </>
    );
  }

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
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen text-white relative z-10 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
              My Investment Portfolio
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
              AI generated allocation based on your latest risk assessment.
            </p>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-10"
          >
            <motion.div variants={fadeInUp} className="glass-panel p-6 border border-white/5 shadow-2xl relative overflow-hidden">
              <p className="text-gray-400 font-semibold text-sm">Stocks</p>
              <h2 className="text-4xl font-black mt-3 text-indigo-400">{portfolio.stocks}%</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-panel p-6 border border-white/5 shadow-2xl relative overflow-hidden">
              <p className="text-gray-400 font-semibold text-sm">ETF</p>
              <h2 className="text-4xl font-black mt-3 text-cyan-400">{portfolio.etf}%</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-panel p-6 border border-white/5 shadow-2xl relative overflow-hidden">
              <p className="text-gray-400 font-semibold text-sm">Bonds</p>
              <h2 className="text-4xl font-black mt-3 text-yellow-500">{portfolio.bonds}%</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-panel p-6 border border-white/5 shadow-2xl relative overflow-hidden">
              <p className="text-gray-400 font-semibold text-sm">Gold</p>
              <h2 className="text-4xl font-black mt-3 text-pink-400">{portfolio.gold}%</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-panel p-6 border border-white/5 shadow-2xl relative overflow-hidden">
              <p className="text-gray-400 font-semibold text-sm">Cash</p>
              <h2 className="text-4xl font-black mt-3 text-gray-400">{portfolio.cash}%</h2>
            </motion.div>
          </motion.div>

          {/* Asset Allocation */}
          <div className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl mt-10">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-8">
              Asset Allocation
            </h2>

            {/* Stocks */}
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm font-semibold text-gray-300">
                <span>Stocks</span>
                <span>{portfolio.stocks}%</span>
              </div>
              <div className="w-full bg-slate-950/60 rounded-full h-4 border border-white/5">
                <div
                  className="h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"
                  style={{ width: `${portfolio.stocks}%` }}
                />
              </div>
            </div>

            {/* ETF */}
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm font-semibold text-gray-300">
                <span>ETFs</span>
                <span>{portfolio.etf}%</span>
              </div>
              <div className="w-full bg-slate-950/60 rounded-full h-4 border border-white/5">
                <div
                  className="h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                  style={{ width: `${portfolio.etf}%` }}
                />
              </div>
            </div>

            {/* Bonds */}
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm font-semibold text-gray-300">
                <span>Bonds</span>
                <span>{portfolio.bonds}%</span>
              </div>
              <div className="w-full bg-slate-950/60 rounded-full h-4 border border-white/5">
                <div
                  className="h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]"
                  style={{ width: `${portfolio.bonds}%` }}
                />
              </div>
            </div>

            {/* Gold */}
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm font-semibold text-gray-300">
                <span>Gold</span>
                <span>{portfolio.gold}%</span>
              </div>
              <div className="w-full bg-slate-950/60 rounded-full h-4 border border-white/5">
                <div
                  className="h-4 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.4)]"
                  style={{ width: `${portfolio.gold}%` }}
                />
              </div>
            </div>

            {/* Cash */}
            <div>
              <div className="flex justify-between mb-2 text-sm font-semibold text-gray-300">
                <span>Cash</span>
                <span>{portfolio.cash}%</span>
              </div>
              <div className="w-full bg-slate-950/60 rounded-full h-4 border border-white/5">
                <div
                  className="h-4 rounded-full bg-gray-500 shadow-[0_0_10px_rgba(100,116,139,0.4)]"
                  style={{ width: `${portfolio.cash}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Portfolio Insights */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-5">
                Portfolio Analysis
              </h2>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span>Allocation generated using your latest risk assessment.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span>Diversified across multiple uncorrelated asset classes.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span>Designed to reduce drawdowns during volatility spikes.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✔</span>
                  <span>Can be re-generated anytime after taking a new assessment.</span>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-5">
                Investment Strategy
              </h2>
              <p className="leading-relaxed text-gray-300 text-sm">
                FinSage recommends balancing investments between equity, fixed-income securities, 
                gold, and liquid cash depending on your personal risk profile. 
                This helps maximize long-term returns while mitigating tail-risk through proper asset class correlation offsets.
              </p>
            </div>
          </div>

          {/* Risk Profile Details */}
          <div className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl mt-10">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Risk Profile Key Pillars
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/40 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                <h3 className="font-bold text-lg text-white">Diversification</h3>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  Your investments are spread across multiple asset classes to reduce single-sector risk.
                </p>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                <h3 className="font-bold text-lg text-white">Long-Term Growth</h3>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  This allocation is optimized for compounding returns over your multi-year horizon.
                </p>
              </div>

              <div className="bg-slate-900/40 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                <h3 className="font-bold text-lg text-white">AI Engine Updates</h3>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                  Retake your assessment periodically to adjust your portfolio as your income or age updates.
                </p>
              </div>
            </div>
          </div>

          {/* Portfolio Summary Banner */}
          <div className="glass-panel p-10 border border-white/5 shadow-2xl rounded-2xl mt-10">
            <h2 className="text-3xl font-black bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
              Portfolio Summary
            </h2>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed max-w-3xl">
              Your investment portfolio has been generated using FinSage's AI-powered risk assessment engine. 
              The allocation aims to balance growth, stability, and liquidity based on your financial profile.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-10 text-center">
              <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <p className="text-gray-500 text-xs">Stocks</p>
                <h3 className="text-2xl font-bold text-indigo-400 mt-1">{portfolio.stocks}%</h3>
              </div>
              <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <p className="text-gray-500 text-xs">ETFs</p>
                <h3 className="text-2xl font-bold text-cyan-400 mt-1">{portfolio.etf}%</h3>
              </div>
              <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <p className="text-gray-500 text-xs">Bonds</p>
                <h3 className="text-2xl font-bold text-yellow-500 mt-1">{portfolio.bonds}%</h3>
              </div>
              <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5">
                <p className="text-gray-500 text-xs">Gold</p>
                <h3 className="text-2xl font-bold text-pink-400 mt-1">{portfolio.gold}%</h3>
              </div>
              <div className="bg-slate-900/30 p-4 rounded-xl border border-white/5 col-span-2 md:col-span-1">
                <p className="text-gray-500 text-xs">Cash</p>
                <h3 className="text-2xl font-bold text-gray-400 mt-1">{portfolio.cash}%</h3>
              </div>
            </div>
          </div>

          {/* Premium Report Link */}
          <div className="flex justify-center mt-12">
            <button
              onClick={downloadReport}
              disabled={downloading}
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold px-10 py-4.5 rounded-xl text-lg transition duration-300 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {downloading ? "Generating PDF..." : "📄 Download Premium Portfolio Report"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
