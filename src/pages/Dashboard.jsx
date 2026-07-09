import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import InfoCard from "../components/InfoCard";
import PerformanceCard from "../components/PerformanceCard";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import InvestmentCard from "../components/InvestmentCard";
import Insights from "../components/Insights";
import ExportButton from "../components/ExportButton";
import Floating3DBackground from "../components/Floating3DBackground";
import { getAssessment } from "../services/assessmentService";
import { getPortfolio } from "../services/portfolioService";

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

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [assessment, setAssessment] = useState(null);
  const [dbPortfolio, setDbPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    async function load() {
      try {
        const [assessmentData, portfolioData] = await Promise.all([
          getAssessment(user.id),
          getPortfolio(user.id)
        ]);

        if (assessmentData && assessmentData.id) {
          setAssessment(assessmentData);
        }
        if (portfolioData && portfolioData.id) {
          setDbPortfolio(portfolioData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            <h2 className="text-xl font-bold">Loading dashboard...</h2>
          </div>
        </div>
      </>
    );
  }

  if (!assessment || !dbPortfolio || !assessment.id || !dbPortfolio.id) {
    return (
      <>
        <Navbar />
        <Floating3DBackground />
        <div className="min-h-screen flex items-center justify-center text-white relative z-10">
          <div className="text-center glass-panel p-12 rounded-3xl shadow-2xl max-w-md border border-white/10">
            <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent">
              No Data Available
            </h2>
            <p className="text-gray-300 mb-8">
              Please complete your risk assessment first to generate your AI-managed portfolio.
            </p>
            <Link to="/assessment" className="inline-block bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-lg shadow-indigo-500/25">
              Start Assessment
            </Link>
          </div>
        </div>
      </>
    );
  }

  const expectedReturn = assessment.risk === "High" ? "16%" : assessment.risk === "Medium" ? "12%" : "8%";

  const portfolio = {
    Stocks: dbPortfolio.stocks,
    ETFs: dbPortfolio.etf,
    Bonds: dbPortfolio.bonds,
    Gold: dbPortfolio.gold,
    Cash: dbPortfolio.cash,
    expectedReturn,
    riskLevel: assessment.risk
  };

  const displayUser = {
    name: user.name,
    age: assessment.age,
    income: assessment.income,
    savings: assessment.monthlyInvestment,
    goal: assessment.goal,
    risk: assessment.risk,
    horizon: assessment.horizon + " Years"
  };

  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen py-12 text-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
                Portfolio Dashboard
              </h1>
              <p className="text-gray-400 mt-2 text-lg">
                Welcome back, <span className="font-semibold text-white">{user.name}</span>
              </p>
            </div>
            
            <div>
              <ExportButton user={user} assessment={assessment} portfolio={portfolio} />
            </div>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10"
          >
            <motion.div variants={fadeInUp}>
              <InfoCard title="Portfolio Value" value="₹15,24,380" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <InfoCard title="Expected Return" value={portfolio.expectedReturn} />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <InfoCard title="Risk Level" value={portfolio.riskLevel} />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <InfoCard title="Investment Goal" value={displayUser.goal} />
            </motion.div>
          </motion.div>

          {/* Performance metrics */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-6 mt-8"
          >
            <motion.div variants={fadeInUp}>
              <PerformanceCard title="1 Year Return" value="+14.2%" color="text-emerald-400" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <PerformanceCard title="Sharpe Ratio" value="1.87" color="text-indigo-400" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <PerformanceCard title="Diversification" value="95%" color="text-fuchsia-400" />
            </motion.div>
          </motion.div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl flex flex-col justify-between"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6">
                Portfolio Allocation
              </h2>
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-[280px] md:max-w-[320px]">
                  <PieChart portfolio={portfolio} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6">
                Asset Allocation
              </h2>
              <table className="w-full text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="text-left py-3 font-semibold">Asset</th>
                    <th className="text-right py-3 font-semibold">Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                    <td className="py-4">📈 Stocks</td>
                    <td className="text-right font-bold text-indigo-400">{portfolio.Stocks}%</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                    <td className="py-4">📊 ETFs</td>
                    <td className="text-right font-bold text-cyan-400">{portfolio.ETFs}%</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                    <td className="py-4">🏦 Bonds</td>
                    <td className="text-right font-bold text-amber-400">{portfolio.Bonds}%</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                    <td className="py-4">🥇 Gold</td>
                    <td className="text-right font-bold text-pink-400">{portfolio.Gold}%</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition duration-150">
                    <td className="py-4">💵 Cash</td>
                    <td className="text-right font-bold text-gray-400">{portfolio.Cash}%</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl mt-12"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Portfolio Growth
            </h2>
            <div className="h-[300px] flex items-center justify-center">
              <LineChart />
            </div>
          </motion.div>

          {/* Investment Suggestions */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl font-black bg-gradient-to-r from-white via-gray-200 to-cyan-300 bg-clip-text text-transparent mt-16"
          >
            Recommended Investments
          </motion.h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 mt-8"
          >
            <motion.div variants={fadeInUp}>
              <InvestmentCard title="Nifty 50 ETF" type="ETF" risk="Low" returns="11%" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <InvestmentCard title="HDFC Flexi Cap Fund" type="Mutual Fund" risk="Moderate" returns="14%" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <InvestmentCard title="Gold ETF" type="Commodity" risk="Low" returns="8%" />
            </motion.div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <Insights />
          </motion.div>

          {/* Investor Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-panel p-8 border border-white/5 shadow-2xl rounded-2xl mt-12 text-gray-300"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-6">
              Investor Profile
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="flex justify-between py-2.5 border-b border-white/5">
                <span className="text-gray-500">Name</span>
                <span className="font-semibold text-white">{displayUser.name}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-white/5">
                <span className="text-gray-500">Age</span>
                <span className="font-semibold text-white">{displayUser.age}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-white/5">
                <span className="text-gray-500">Annual Income</span>
                <span className="font-semibold text-white">₹{Number(displayUser.income).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-white/5">
                <span className="text-gray-500">Current Savings</span>
                <span className="font-semibold text-white">₹{Number(displayUser.savings).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-white/5">
                <span className="text-gray-500">Investment Goal</span>
                <span className="font-semibold text-white">{displayUser.goal}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-white/5">
                <span className="text-gray-500">Risk Appetite</span>
                <span className="font-semibold text-white">{displayUser.risk}</span>
              </div>
              <div className="flex justify-between py-2.5 md:col-span-2">
                <span className="text-gray-500">Investment Horizon</span>
                <span className="font-semibold text-white">{displayUser.horizon}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
