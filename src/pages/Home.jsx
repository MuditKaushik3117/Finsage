import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-slate-100 min-h-screen"
      >
        {/* Hero */}

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
                AI Powered
                <br />
                Portfolio Advisor
              </h1>

              <p className="mt-8 text-xl text-gray-600 leading-8">
                Get personalized investment recommendations based on your
                financial profile, investment goals, and risk appetite.
                Our AI-inspired portfolio engine helps you build diversified,
                data-driven portfolios for long-term wealth creation.
              </p>

              <div className="flex gap-6 mt-10 flex-wrap">

                <Link
                  to="/assessment"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg transition"
                >
                  Start Assessment
                </Link>

                <Link
                  to="/about"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl text-lg transition"
                >
                  Learn More
                </Link>

              </div>

            </div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl p-10"
            >

              <h2 className="text-3xl font-bold mb-8">
                Portfolio Snapshot
              </h2>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <span>Stocks</span>
                  <span className="font-bold text-blue-600">
                    45%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>ETFs</span>
                  <span className="font-bold text-green-600">
                    25%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Bonds</span>
                  <span className="font-bold text-orange-500">
                    15%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Gold</span>
                  <span className="font-bold text-yellow-600">
                    10%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Cash</span>
                  <span className="font-bold text-gray-700">
                    5%
                  </span>
                </div>

              </div>

            </motion.div>

          </div>

        </section>

        {/* Statistics */}

        <section className="max-w-7xl mx-auto px-6 py-10">

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <h2 className="text-5xl font-bold text-blue-600">
                12%
              </h2>

              <p className="mt-4 text-gray-600">
                Expected Annual Return
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <h2 className="text-5xl font-bold text-green-600">
                95%
              </h2>

              <p className="mt-4 text-gray-600">
                Diversification Score
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <h2 className="text-5xl font-bold text-purple-600">
                1.87
              </h2>

              <p className="mt-4 text-gray-600">
                Average Sharpe Ratio
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

              <h2 className="text-5xl font-bold text-red-500">
                10K+
              </h2>

              <p className="mt-4 text-gray-600">
                Investors Assisted
              </p>

            </div>

          </div>

        </section>

        {/* Features */}

        <section className="max-w-7xl mx-auto px-6 py-20">

          <h2 className="text-5xl font-bold text-center">
            Why Choose FinSage?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h3 className="text-2xl font-bold">
                📊 Smart Portfolio Allocation
              </h3>

              <p className="mt-5 text-gray-600 leading-7">
                Our recommendation engine allocates investments across stocks,
                ETFs, bonds, gold and cash according to your financial profile.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h3 className="text-2xl font-bold">
                🤖 AI Recommendations
              </h3>

              <p className="mt-5 text-gray-600 leading-7">
                Receive intelligent investment suggestions tailored to your
                goals, risk tolerance and investment horizon.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h3 className="text-2xl font-bold">
                📈 Portfolio Analytics
              </h3>

              <p className="mt-5 text-gray-600 leading-7">
                Track asset allocation, expected returns, diversification,
                growth and performance using interactive charts.
              </p>

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="bg-blue-600 text-white py-20">

          <div className="max-w-5xl mx-auto text-center px-6">

            <h2 className="text-5xl font-bold">
              Ready to Build Your Portfolio?
            </h2>

            <p className="mt-6 text-xl">
              Complete a short assessment and receive a personalized AI-powered
              investment portfolio in minutes.
            </p>

            <Link
              to="/assessment"
              className="inline-block mt-10 bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl text-lg font-semibold transition"
            >
              Get Started
            </Link>

          </div>

        </section>

        {/* Footer */}

        <footer className="bg-slate-900 text-white py-12">

          <div className="max-w-7xl mx-auto text-center">

            <h2 className="text-3xl font-bold">
              FinSage
            </h2>

            <p className="mt-4 text-gray-300">
              Helping investors make smarter financial decisions with AI.
            </p>

            <p className="mt-8 text-gray-500">
              © 2026 FinSage. All Rights Reserved.
            </p>

          </div>

        </footer>

      </motion.div>
    </>
  );
}

export default Home;

