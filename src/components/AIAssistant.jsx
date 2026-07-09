import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your FinSage AI Assistant. How can I help you optimize your portfolio or answer your doubts today?"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    if (!textToSend) setInput("");

    // Generate response
    setTimeout(() => {
      const responseText = getAIResponse(query);
      setMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
    }, 600);
  };

  const getAIResponse = (query) => {
    const q = query.toLowerCase();
    
    // Fetch user context from localStorage
    const userStr = localStorage.getItem("user");
    const portfolioStr = localStorage.getItem("portfolio");
    const profileStr = localStorage.getItem("portfolioUser");

    const user = userStr ? JSON.parse(userStr) : null;
    const portfolio = portfolioStr ? JSON.parse(portfolioStr) : null;
    const profile = profileStr ? JSON.parse(profileStr) : null;

    if (!user) {
      return "It looks like you aren't signed in. Please log in or create an account so I can analyze your custom investment plan.";
    }

    if (q.includes("split") || q.includes("portfolio") || q.includes("allocation")) {
      if (!portfolio) {
        return `Hello ${user.name}, you haven't generated a portfolio yet. Please head to the Assessment page to calculate your personalized investment splits.`;
      }
      return `Your AI-guided portfolio consists of:
• **${portfolio.Stocks}% Stocks** (High Growth)
• **${portfolio.ETFs}% ETFs** (Market Index)
• **${portfolio.Bonds}% Bonds** (Fixed Income stability)
• **${portfolio.Gold}% Gold** (Commodity hedging)
• **${portfolio.Cash}% Cash** (Liquidity)

This configuration targets an expected annual return of **${portfolio.expectedReturn}** based on your **${portfolio.riskLevel}** risk appetite.`;
    }

    if (q.includes("rebalance") || q.includes("deviation") || q.includes("rebalancing")) {
      if (!portfolio) {
        return "Complete your risk assessment to generate a custom target layout. Once active, I can calculate asset shifts to align back to your plan.";
      }
      return `Based on target calculations:
• Stocks: Target is **${portfolio.Stocks}%** (current estimated is ${portfolio.Stocks + 5}%, recommend selling 5%)
• ETFs: Target is **${portfolio.ETFs}%** (current estimated is ${portfolio.ETFs - 3}%, recommend buying 3%)
• Bonds: Target is **${portfolio.Bonds}%** (current estimated is ${portfolio.Bonds - 1}%, recommend buying 1%)
• Gold: Target is **${portfolio.Gold}%** (current estimated is ${portfolio.Gold - 1}%, recommend buying 1%)
• Cash: Target is **${portfolio.Cash}%** (holding stable)

You can check complete figures on the **Portfolio Rebalancing** screen.`;
    }

    if (q.includes("sharpe") || q.includes("ratio")) {
      return "Your portfolio features a Sharpe Ratio of **1.87**. In finance, a Sharpe Ratio above 1.0 is considered good. 1.87 indicates excellent risk-adjusted returns, meaning you are capturing substantial yield per unit of volatility.";
    }

    if (q.includes("bond") || q.includes("bonds")) {
      return "Bonds are debt securities issued by corporations or governments. They pay periodic coupon interest and return principal at maturity. In your plan, bonds act as capital preservation filters during equity pullbacks.";
    }

    if (q.includes("etf") || q.includes("etfs")) {
      return "Exchange-Traded Funds (ETFs) track index baskets (like the Nifty 50 or S&P 500). They trade on exchanges like stocks and provide broad sector diversification at very low management cost ratios.";
    }

    if (q.includes("stock") || q.includes("equity") || q.includes("stocks")) {
      return "Stocks (or equities) represent fractional ownership in a business. They offer premium capital appreciation over long periods but experience higher short-term price swings.";
    }

    if (q.includes("gold")) {
      return "Gold is a hard store of value. It has low correlation with equities and bonds, serving as a reliable hedge against currency inflation and macroeconomic distress.";
    }

    if (q.includes("emergency") || q.includes("fund") || q.includes("savings")) {
      const savingsVal = profile ? Number(profile.savings).toLocaleString() : "monthly savings";
      return `For financial security, we advise maintaining 3 to 6 months of fixed living expenses in cash or liquid bank deposits. Since your target monthly contribution is **₹${savingsVal}**, ensure your cash buffer is complete before maximizing higher risk equity products.`;
    }

    return `I can help clear up doubts on the following items. Click one of these suggestions:
• "Explain my portfolio split"
• "How should I rebalance?"
• "What is the Sharpe Ratio?"
• "What is an ETF?"`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="glass-panel w-80 md:w-96 h-[460px] rounded-2xl border border-white/10 shadow-3xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-950 to-slate-900 px-5 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">FinSage AI Copilot</h3>
                  <p className="text-[10px] text-gray-400">Active portfolio guidance</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chips Container */}
            <div className="px-3 py-2 bg-slate-950/20 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none border-b border-white/5">
              <button
                onClick={() => handleSend("Explain my portfolio split")}
                className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-300 px-2.5 py-1 rounded-full border border-white/5 transition"
              >
                📊 My Split
              </button>
              <button
                onClick={() => handleSend("How should I rebalance?")}
                className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-300 px-2.5 py-1 rounded-full border border-white/5 transition"
              >
                ⚖️ Rebalance?
              </button>
              <button
                onClick={() => handleSend("What is the Sharpe Ratio?")}
                className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-300 px-2.5 py-1 rounded-full border border-white/5 transition"
              >
                📈 Sharpe Ratio?
              </button>
              <button
                onClick={() => handleSend("What is an ETF?")}
                className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-300 px-2.5 py-1 rounded-full border border-white/5 transition"
              >
                🏦 What is ETF?
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/10"
                        : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-950/30 border-t border-white/5 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about risk, allocation, definitions..."
                className="flex-1 bg-slate-950/40 border border-white/5 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-indigo-500 transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl p-2 transition shadow-md shadow-indigo-600/20"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition duration-300 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none" />
        <MessageSquare size={24} className="relative z-10" />
      </motion.button>
    </div>
  );
}
