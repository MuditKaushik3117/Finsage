import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Floating3DBackground from "../components/Floating3DBackground";
import { getStock } from "../services/marketService";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function Home() {
  const [tickers, setTickers] = useState([]);
  const [stockGrid, setStockGrid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMarketData = async () => {
    try {
      setRefreshing(true);
      const symbols = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NFLX"];
      const data = await Promise.all(symbols.map((sym) => getStock(sym)));
      
      const parsedData = data
        .filter((d) => d && d.success)
        .map((d) => ({
          symbol: d.profile.ticker,
          name: d.profile.name,
          logo: d.profile.logo,
          price: d.quote.c,
          change: d.quote.dp,
          changeVal: d.quote.d,
          high: d.quote.h,
          low: d.quote.l
        }));

      setTickers(parsedData.slice(0, 5));
      setStockGrid(parsedData);
    } catch (err) {
      console.error("Error loading home page tickers:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen text-white relative z-10 overflow-hidden">
        
        {/* Real-time Scrolling Ticker Marquee */}
        <div className="w-full bg-slate-950/60 backdrop-blur-md border-b border-white/5 py-3 overflow-hidden select-none">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-12 text-sm font-semibold">
            {loading ? (
              <span className="text-gray-500 animate-pulse px-6">Loading real-time market feeds...</span>
            ) : (
              // Double the list to create a seamless infinite marquee effect
              [...tickers, ...tickers].map((t, idx) => (
                <div key={idx} className="flex items-center gap-3 px-2">
                  <span className="text-white font-extrabold">{t.symbol}</span>
                  <span className="text-gray-300 font-medium">${t.price.toFixed(2)}</span>
                  <span className={`flex items-center gap-0.5 text-xs ${t.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {t.change >= 0 ? "+" : ""}{t.change.toFixed(2)}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Copywriting */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeInUp}
                className="text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent tracking-tight"
              >
                Personalised
                <br />
                Portfolio Intelligence
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-8 text-xl text-gray-300 leading-relaxed max-w-xl"
              >
                FinSage integrates real-time market tickers and volatility indices 
                with Modern Portfolio Theory to engineer target asset allocations. 
                Answer a simple risk assessment to structure a secure, balanced investment plan.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex gap-6 mt-10 flex-wrap"
              >
                <Link
                  to="/assessment"
                  className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Assessment
                </Link>

                <Link
                  to="/about"
                  className="border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-200 px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Live S&P 500 Index Chart Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-panel p-5 border border-white/10 shadow-2xl rounded-2xl overflow-hidden h-[420px]"
            >
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="font-extrabold text-sm text-gray-300">Live Global Index Widget</h3>
                </div>
                <span className="text-[10px] text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full font-semibold">
                  S&P 500 (SPY)
                </span>
              </div>
              
              <div className="h-[340px] rounded-xl overflow-hidden border border-white/5">
                <AdvancedRealTimeChart
                  theme="dark"
                  symbol="SPY"
                  width="100%"
                  height="100%"
                  interval="D"
                  timezone="Etc/UTC"
                  hide_side_toolbar={true}
                  hide_legend={true}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Equities Matrix Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
                Live Market Quotes
              </h2>
              <p className="text-gray-400 mt-2 text-sm">
                Actual stock prices pulling live from global trading exchanges.
              </p>
            </div>
            
            <button
              onClick={fetchMarketData}
              disabled={refreshing}
              className="flex items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300 px-5 py-2.5 rounded-xl font-bold transition text-sm disabled:opacity-50"
            >
              <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh Feed"}
            </button>
          </div>

          {loading ? (
            <div className="glass-panel p-16 text-center text-gray-400 border border-white/5">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading real-time quotes feed...
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stockGrid.map((s, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-6 border border-white/5 hover:border-white/10 transition-all duration-300 rounded-2xl relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {s.logo && (
                        <img
                          src={s.logo}
                          className="w-10 h-10 rounded-xl bg-white border border-white/10 p-1 object-contain"
                          alt=""
                        />
                      )}
                      <div>
                        <h3 className="font-extrabold text-lg text-white">{s.symbol}</h3>
                        <p className="text-gray-500 text-xs truncate max-w-[120px] font-medium">{s.name}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <h4 className="text-xl font-black">${s.price.toFixed(2)}</h4>
                      <div className={`flex items-center gap-1 text-xs justify-end font-bold mt-1 ${s.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                        {s.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/5 text-xs text-gray-400">
                    <div>
                      <span className="text-gray-500 block">Daily High</span>
                      <span className="font-bold text-white mt-0.5 block">${s.high.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 block">Daily Low</span>
                      <span className="font-bold text-white mt-0.5 block">${s.low.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Practical Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <h2 className="text-4xl lg:text-5xl font-black text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Scientific Portfolio Advice
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="glass-panel p-8 border border-white/5 relative">
              <div className="text-3xl mb-5">⚖️</div>
              <h3 className="text-2xl font-bold text-white">
                Modern Portfolio Theory
              </h3>
              <p className="mt-4 text-gray-400 leading-relaxed text-sm">
                FinSage optimizes weightings based on Markowitz's efficient frontier to ensure 
                you receive the maximum expected return per unit of volatility score.
              </p>
            </div>

            <div className="glass-panel p-8 border border-white/5 relative">
              <div className="text-3xl mb-5">⚡</div>
              <h3 className="text-2xl font-bold text-white">
                Live Pricing Metrics
              </h3>
              <p className="mt-4 text-gray-400 leading-relaxed text-sm">
                We pull actual asset volumes and trading metrics directly, bypassing stale numbers 
                and demo estimates when assessing market shifts.
              </p>
            </div>

            <div className="glass-panel p-8 border border-white/5 relative">
              <div className="text-3xl mb-5">🛡️</div>
              <h3 className="text-2xl font-bold text-white">
                Automated Rebalancing
              </h3>
              <p className="mt-4 text-gray-400 leading-relaxed text-sm">
                Easily monitor deviations between your current holdings and recommended splits. 
                Identify exactly how many shares to adjust to preserve target yields.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-indigo-950/20 backdrop-blur-md -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center px-6 relative z-10"
          >
            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
              Ready to Structure Your Assets?
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Complete your assessment in minutes to configure an asset distribution built around your goals.
            </p>
            <Link
              to="/assessment"
              className="inline-block mt-10 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold px-10 py-4.5 rounded-xl text-lg transition-all duration-300 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5"
            >
              Get Started Now
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-slate-950/60 backdrop-blur-sm py-14 text-center text-gray-400">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black tracking-tight text-white mb-3">
              FinSage
            </h2>
            <p className="text-gray-500 text-sm">
              Helping investors make smarter financial decisions with AI.
            </p>
            <p className="mt-8 text-gray-600 text-xs">
              © 2026 FinSage. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
