import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Floating3DBackground from "../components/Floating3DBackground";
import { getPortfolio } from "../services/portfolioService";
import { motion } from "framer-motion";

function Rebalancing() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const data = await getPortfolio(user.id);
        if (data && data.id) {
          const mappedPortfolio = {
            Stocks: data.stocks,
            ETFs: data.etf,
            Bonds: data.bonds,
            Gold: data.gold,
            Cash: data.cash
          };
          setPortfolio(mappedPortfolio);
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
            <h2 className="text-xl font-bold">Loading...</h2>
          </div>
        </div>
      </>
    );
  }

  if (!portfolio) {
    return (
      <>
        <Navbar />
        <Floating3DBackground />
        <div className="min-h-screen flex items-center justify-center text-white relative z-10">
          <div className="text-center glass-panel p-10 rounded-2xl shadow-lg max-w-md border border-white/10">
            <h2 className="text-3xl font-black mb-3 text-red-400">
              No Data Available
            </h2>
            <p className="text-gray-300 mb-6">
              Please complete the risk assessment first.
            </p>
            <Link to="/assessment" className="inline-block bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-3 rounded-xl transition font-bold shadow-lg shadow-indigo-500/20">
              Start Assessment
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen text-white relative z-10 py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
            Portfolio Rebalancing
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Compare your estimated asset deviation against recommended allocations.
          </p>

          <div className="glass-panel mt-10 p-10 border border-white/5 shadow-2xl rounded-2xl">
            <table className="w-full text-gray-300">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="py-4 text-left font-semibold">Asset Class</th>
                  <th className="py-4 text-right font-semibold">Current Allocation</th>
                  <th className="py-4 text-right font-semibold">Recommended Target</th>
                  <th className="py-4 text-right font-semibold">Deviation</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                  <td className="py-4 font-semibold text-white">📈 Stocks</td>
                  <td className="text-right font-bold text-gray-400">{(portfolio.Stocks + 5)}%</td>
                  <td className="text-right font-bold text-indigo-400">{portfolio.Stocks}%</td>
                  <td className="text-right font-bold text-rose-400">+5%</td>
                </tr>

                <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                  <td className="py-4 font-semibold text-white">📊 ETFs</td>
                  <td className="text-right font-bold text-gray-400">{(portfolio.ETFs - 3)}%</td>
                  <td className="text-right font-bold text-cyan-400">{portfolio.ETFs}%</td>
                  <td className="text-right font-bold text-emerald-400">-3%</td>
                </tr>

                <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                  <td className="py-4 font-semibold text-white">🏦 Bonds</td>
                  <td className="text-right font-bold text-gray-400">{(portfolio.Bonds - 1)}%</td>
                  <td className="text-right font-bold text-yellow-500">{portfolio.Bonds}%</td>
                  <td className="text-right font-bold text-emerald-400">-1%</td>
                </tr>

                <tr className="border-b border-white/5 hover:bg-white/5 transition duration-150">
                  <td className="py-4 font-semibold text-white">🥇 Gold</td>
                  <td className="text-right font-bold text-gray-400">{(portfolio.Gold - 1)}%</td>
                  <td className="text-right font-bold text-pink-400">{portfolio.Gold}%</td>
                  <td className="text-right font-bold text-emerald-400">-1%</td>
                </tr>

                <tr className="hover:bg-white/5 transition duration-150">
                  <td className="py-4 font-semibold text-white">💵 Cash</td>
                  <td className="text-right font-bold text-gray-400">{portfolio.Cash}%</td>
                  <td className="text-right font-bold text-gray-300">{portfolio.Cash}%</td>
                  <td className="text-right font-bold text-indigo-400">0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Rebalancing;
