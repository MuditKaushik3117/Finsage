import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import questions from "../data/questions";
import Floating3DBackground from "../components/Floating3DBackground";
import { saveAssessment } from "../services/assessmentService";
import { generatePortfolio } from "../services/portfolioService";
import { motion } from "framer-motion";

function Assessment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    savings: "",
    goal: "",
    risk: "",
    horizon: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    try {
      const assessmentResult = await saveAssessment({
        userId: user.id,
        age: Number(formData.age),
        income: Number(formData.income),
        goal: formData.goal,
        horizon: parseInt(formData.horizon, 10) || 0,
        monthlyInvestment: Number(formData.savings) || 0
      });

      if (assessmentResult.success) {
        const portfolioResult = await generatePortfolio(user.id);
        if (portfolioResult.success) {
          localStorage.setItem("portfolioUser", JSON.stringify(formData));
          
          const localPortfolio = {
            Stocks: portfolioResult.portfolio.stocks,
            ETFs: portfolioResult.portfolio.etf,
            Bonds: portfolioResult.portfolio.bonds,
            Gold: portfolioResult.portfolio.gold,
            Cash: portfolioResult.portfolio.cash,
            expectedReturn: portfolioResult.portfolio.stocks === 70 ? "16%" : portfolioResult.portfolio.stocks === 50 ? "12%" : "8%",
            riskLevel: assessmentResult.risk
          };
          localStorage.setItem("portfolio", JSON.stringify(localPortfolio));
          
          navigate("/recommendation");
        } else {
          alert("Failed to generate portfolio recommendation.");
        }
      } else {
        alert("Failed to save assessment.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen text-white relative z-10 py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl lg:text-5xl font-black mb-10 text-center bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent tracking-tight">
            Investor Assessment
          </h1>

          <form
            onSubmit={handleSubmit}
            className="glass-panel p-10 border border-white/10 shadow-3xl rounded-2xl space-y-6"
          >
            {questions.map((q) => (
              <div key={q.id} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300">
                  {q.label}
                </label>

                {q.type === "select" ? (
                  <select
                    name={q.id}
                    value={formData[q.id]}
                    onChange={handleChange}
                    className="w-full glass-input rounded-xl p-3.5 outline-none text-white bg-slate-950/50"
                    required
                  >
                    <option value="" className="bg-slate-950 text-gray-400">Choose</option>
                    {q.options.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-slate-950 text-white"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={q.type}
                    name={q.id}
                    value={formData[q.id]}
                    onChange={handleChange}
                    className="w-full glass-input rounded-xl p-3.5 outline-none text-white bg-slate-950/50"
                    required
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl text-lg transition duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 mt-8"
            >
              Generate Portfolio
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Assessment;
