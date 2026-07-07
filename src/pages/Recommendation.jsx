import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { generatePortfolio } from "../utils/portfolioEngine";

function Recommendation() {
  const user = JSON.parse(localStorage.getItem("portfolioUser"));

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            Please complete the assessment first.
          </h2>
        </div>
      </>
    );
  }

  const portfolio = generatePortfolio(user);

  localStorage.setItem("portfolio", JSON.stringify(portfolio));

  return (
    <>
      <Navbar />

      <div className="bg-slate-100 min-h-screen py-12">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-center">
            AI Portfolio Recommendation
          </h1>

          <p className="text-center text-gray-600 mt-4 text-lg">
            Personalized investment strategy based on your financial profile
          </p>

          {/* User Summary */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

            <h2 className="text-3xl font-bold">
              Hello, {user.name} 👋
            </h2>

            <p className="text-gray-600 mt-3">
              Based on your age, financial goals, investment horizon and risk
              appetite, our AI has created the following portfolio allocation.
            </p>

          </div>

          {/* Portfolio Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">

            <div className="bg-blue-100 rounded-xl p-6 text-center">
              <h3 className="font-semibold">📈 Stocks</h3>
              <p className="text-4xl font-bold mt-4">
                {portfolio.Stocks}%
              </p>
            </div>

            <div className="bg-green-100 rounded-xl p-6 text-center">
              <h3 className="font-semibold">📊 ETFs</h3>
              <p className="text-4xl font-bold mt-4">
                {portfolio.ETFs}%
              </p>
            </div>

            <div className="bg-yellow-100 rounded-xl p-6 text-center">
              <h3 className="font-semibold">🏦 Bonds</h3>
              <p className="text-4xl font-bold mt-4">
                {portfolio.Bonds}%
              </p>
            </div>

            <div className="bg-orange-100 rounded-xl p-6 text-center">
              <h3 className="font-semibold">🥇 Gold</h3>
              <p className="text-4xl font-bold mt-4">
                {portfolio.Gold}%
              </p>
            </div>

            <div className="bg-gray-200 rounded-xl p-6 text-center">
              <h3 className="font-semibold">💵 Cash</h3>
              <p className="text-4xl font-bold mt-4">
                {portfolio.Cash}%
              </p>
            </div>

          </div>

          {/* Recommendation Details */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-bold">
              Recommendation Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mt-8">

              <div>

                <p className="mb-4">
                  <strong>Risk Level:</strong> {portfolio.riskLevel}
                </p>

                <p className="mb-4">
                  <strong>Expected Annual Return:</strong>{" "}
                  {portfolio.expectedReturn}
                </p>

                <p className="mb-4">
                  <strong>Investment Goal:</strong> {user.goal}
                </p>

                <p className="mb-4">
                  <strong>Investment Horizon:</strong>{" "}
                  {user.horizon}
                </p>

              </div>

              <div>

                <p className="mb-4">
                  <strong>Annual Income:</strong> ₹
                  {Number(user.income).toLocaleString()}
                </p>

                <p className="mb-4">
                  <strong>Current Savings:</strong> ₹
                  {Number(user.savings).toLocaleString()}
                </p>

                <p className="mb-4">
                  <strong>Age:</strong> {user.age}
                </p>

                <p className="mb-4">
                  <strong>Recommended Review:</strong>
                  {" "}Every 6 Months
                </p>

              </div>

            </div>

          </div>

          {/* AI Explanation */}

          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mt-10">

            <h2 className="text-2xl font-bold">
              🤖 Why This Portfolio?
            </h2>

            <ul className="list-disc pl-6 mt-6 space-y-3">

              <li>
                Matches your selected risk appetite.
              </li>

              <li>
                Diversifies investments across multiple asset classes.
              </li>

              <li>
                Optimized for long-term wealth creation.
              </li>

              <li>
                Reduces overall portfolio volatility.
              </li>

              <li>
                Suitable for your investment horizon.
              </li>

              <li>
                Rebalancing every six months is recommended.
              </li>

            </ul>

          </div>

          {/* Suggested Strategy */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-bold">
              Suggested Investment Strategy
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              <div className="bg-blue-50 rounded-xl p-6">

                <h3 className="font-bold text-xl">
                  SIP Investing
                </h3>

                <p className="mt-3 text-gray-600">
                  Invest monthly through Systematic Investment Plans to
                  benefit from rupee cost averaging.
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-6">

                <h3 className="font-bold text-xl">
                  Long-Term Growth
                </h3>

                <p className="mt-3 text-gray-600">
                  Stay invested for your selected horizon to maximize
                  compounding returns.
                </p>

              </div>

              <div className="bg-yellow-50 rounded-xl p-6">

                <h3 className="font-bold text-xl">
                  Diversification
                </h3>

                <p className="mt-3 text-gray-600">
                  Spread investments across equity, debt, ETFs,
                  commodities and cash.
                </p>

              </div>

            </div>

          </div>

          {/* Disclaimer */}

          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mt-10">

            <h2 className="text-xl font-bold">
              Investment Disclaimer
            </h2>

            <p className="mt-4 text-gray-700">
              This recommendation is generated using a rule-based AI model
              for educational purposes. It should not be considered financial
              advice. Please consult a certified financial advisor before
              making investment decisions.
            </p>

          </div>

          {/* Navigation Buttons */}

          <div className="flex justify-center gap-6 mt-12">

            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition"
            >
              View Dashboard
            </Link>

            <Link
              to="/market"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition"
            >
              Market Outlook
            </Link>

          </div>

        </div>

      </div>
    </>
  );
}

export default Recommendation;


