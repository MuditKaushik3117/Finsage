import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { getStock } from "../services/marketService";
import {
  addWatchlist,
  getWatchlist,
  deleteWatchlist,
} from "../services/watchlistService";
import { getNews } from "../services/newsService";
import TradingChart from "../components/TradingChart";
import Floating3DBackground from "../components/Floating3DBackground";
import { motion } from "framer-motion";

export default function Market() {
  const [symbol, setSymbol] = useState("AAPL");
  const [stock, setStock] = useState(null);
  const [news, setNews] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  async function loadWatchlist() {
    if (!user) return;

    try {
      const data = await getWatchlist(user.id);
      setWatchlist(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveWatchlist() {
    if (!user || !stock) return;

    try {
      await addWatchlist(user.id, stock.profile.ticker);
      loadWatchlist();
      alert("Added to Watchlist");
    } catch (err) {
      alert("Unable to add.");
    }
  }

  async function removeWatch(id) {
    await deleteWatchlist(id);
    loadWatchlist();
  }

  async function loadStock(sym = symbol) {
    try {
      setLoading(true);
      setError("");

      const market = await getStock(sym.toUpperCase());

      if (!market.success) {
        setError("Stock not found");
        setStock(null);
        return;
      }

      setStock(market);

      try {
        const articles = await getNews(sym.toUpperCase());
      
        if (Array.isArray(articles)) {
          setNews(articles.slice(0, 6));
        } else {
          setNews([]);
        }
      } catch {
        setNews([]);
      }

    } catch (err) {
      console.log(err);
      setError("Unable to fetch market data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStock(symbol);
    loadWatchlist();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      loadStock(symbol);
    }, 30000);
  
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen text-white relative z-10 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
              Live Market Dashboard
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Live stock prices • Company information • News • Watchlist
            </p>
          </motion.div>

          <div className="flex gap-4 mt-10">
            <input
              className="flex-1 rounded-xl glass-input p-4 outline-none text-white bg-slate-950/40"
              value={symbol}
              placeholder="Search AAPL, NVDA, TSLA..."
              onChange={(e) => setSymbol(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadStock(symbol)}
            />

            <button
              onClick={() => loadStock(symbol)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-8 flex items-center gap-2 font-bold shadow-lg shadow-indigo-600/20"
            >
              <Search size={20} />
              Search
            </button>
          </div>

          {loading && (
            <div className="glass-panel rounded-2xl p-12 text-center text-xl font-bold mt-10 border border-white/5">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading Market Data...
            </div>
          )}

          {!loading && error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-6 mt-10 text-center font-semibold">
              {error}
            </div>
          )}

          {!loading && stock && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-8 mt-10 border border-white/5 shadow-2xl rounded-2xl"
              >
                <div className="flex items-center gap-6 flex-wrap">
                  {stock.profile.logo && (
                    <img
                      src={stock.profile.logo}
                      className="w-20 h-20 rounded-2xl border border-white/10 p-2 bg-white/5 object-contain"
                      alt=""
                    />
                  )}

                  <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
                      {stock.profile.name}
                    </h2>
                    <p className="text-gray-400 text-lg font-bold">
                      {stock.profile.ticker}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {stock.profile.exchange}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 mt-10">
                  <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6">
                    <p className="text-gray-500 text-sm">Current Price</p>
                    <h2 className="text-4xl font-black mt-3 text-white">
                      ${stock.quote.c}
                    </h2>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6">
                    <p className="text-gray-500 text-sm">Day Change</p>
                    <div className="flex items-center gap-2 mt-3">
                      {stock.quote.d >= 0 ? (
                        <TrendingUp className="text-emerald-400" />
                      ) : (
                        <TrendingDown className="text-rose-400" />
                      )}
                      <h2
                        className={`text-4xl font-black ${
                          stock.quote.d >= 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {stock.quote.d}
                      </h2>
                    </div>
                  </div>

                  <div className="bg-slate-900/40 border border-white/5 rounded-xl p-6">
                    <p className="text-gray-500 text-sm">Change %</p>
                    <h2
                      className={`text-4xl font-black mt-3 ${
                        stock.quote.dp >= 0
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {stock.quote.dp}%
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  <div className="bg-slate-950/20 border border-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-500 text-xs">High</p>
                    <h3 className="text-lg font-bold mt-1">${stock.quote.h}</h3>
                  </div>

                  <div className="bg-slate-950/20 border border-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-500 text-xs">Low</p>
                    <h3 className="text-lg font-bold mt-1">${stock.quote.l}</h3>
                  </div>

                  <div className="bg-slate-950/20 border border-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-500 text-xs">Open</p>
                    <h3 className="text-lg font-bold mt-1">${stock.quote.o}</h3>
                  </div>

                  <div className="bg-slate-950/20 border border-white/5 p-4 rounded-xl text-center">
                    <p className="text-gray-500 text-xs">Prev Close</p>
                    <h3 className="text-lg font-bold mt-1">${stock.quote.pc}</h3>
                  </div>
                </div>

                <button
                  onClick={saveWatchlist}
                  className="mt-8 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35"
                >
                  ⭐ Add to Watchlist
                </button>
              </motion.div>

              {/* Trading Chart */}
              <div className="mt-8">
                <TradingChart symbol={stock.profile.ticker} />
              </div>

              {/* Company Information */}
              <div className="glass-panel p-8 mt-10 border border-white/5 shadow-2xl rounded-2xl">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent mb-8">
                  Company Information
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                  <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5">
                    <p className="text-gray-500">Country</p>
                    <h3 className="font-bold text-white mt-1">{stock.profile.country || "N/A"}</h3>
                  </div>

                  <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5">
                    <p className="text-gray-500">Currency</p>
                    <h3 className="font-bold text-white mt-1">{stock.profile.currency || "N/A"}</h3>
                  </div>

                  <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5">
                    <p className="text-gray-500">Industry</p>
                    <h3 className="font-bold text-white mt-1">{stock.profile.finnhubIndustry || "N/A"}</h3>
                  </div>

                  <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5">
                    <p className="text-gray-500">IPO Date</p>
                    <h3 className="font-bold text-white mt-1">{stock.profile.ipo || "N/A"}</h3>
                  </div>

                  <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5">
                    <p className="text-gray-500">Exchange</p>
                    <h3 className="font-bold text-white mt-1">{stock.profile.exchange || "N/A"}</h3>
                  </div>

                  <div className="bg-slate-900/40 p-5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">Website</p>
                      <a
                        href={stock.profile.weburl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 font-semibold hover:underline block mt-1"
                      >
                        Official Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Financial News */}
              <div className="glass-panel p-8 mt-10 border border-white/5 shadow-2xl rounded-2xl">
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                    Latest Financial News
                  </h2>
                  <span className="text-gray-500 text-sm font-semibold">
                    Top 6 Headlines
                  </span>
                </div>

                {news.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 border border-white/5 rounded-xl bg-slate-950/20">
                    No recent news available.
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {news.map((article, index) => (
                      <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block bg-slate-900/30 hover:bg-slate-900/60 hover:border-white/10 transition-all duration-300 rounded-xl p-6 border border-white/5 flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="font-bold text-lg text-white line-clamp-2">
                            {article.headline}
                          </h3>
                          <p className="text-gray-400 mt-3 text-sm line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                        <p className="text-indigo-400 mt-4 font-semibold text-sm hover:underline">
                          Read Full Article →
                        </p>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Watchlist */}
              <div className="glass-panel p-8 mt-10 border border-white/5 shadow-2xl rounded-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                    My Watchlist
                  </h2>
                  <span className="text-gray-500 text-sm font-semibold bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {watchlist.length} Stocks
                  </span>
                </div>

                {watchlist.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 border border-white/5 rounded-xl bg-slate-950/20">
                    Your watchlist is empty.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {watchlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border border-white/5 rounded-xl p-5 bg-slate-900/30 hover:border-white/10 transition"
                      >
                        <div>
                          <h3 className="font-bold text-lg text-white">
                            {item.symbol}
                          </h3>
                          <p className="text-gray-500 text-xs">
                            Saved for quick tracking
                          </p>
                        </div>

                        <button
                          onClick={() => removeWatch(item.id)}
                          className="bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 border border-rose-600/20 px-4 py-2 rounded-lg text-xs font-bold transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
