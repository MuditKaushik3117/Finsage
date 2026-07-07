import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">

<div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"> </div>

<div className="absolute top-40 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"> </div>

<div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"> </div>

{/* Main Content */}

<div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

  

<div className="grid lg:grid-cols-2 gap-16 items-center">

  {/* Left Content */}

  <div>
  <div className="flex items-center gap-4 mb-8">

<img
  src={logo}
  className="w-20 h-20 rounded-full shadow-2xl"
  alt="FinSage"
/>

<div>

  <h2 className="text-4xl font-bold">

    FinSage

  </h2>

  <p className="text-blue-200">

    Invest Smarter. Grow Faster.

  </p>

</div>

</div>

    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
      FinSage 
    </span>

    <h1 className="text-6xl font-extrabold text-slate-900 leading-tight mt-8">
      Build Smarter
      <br />
      Investment
      <br />
      Portfolios with AI
    </h1>

    <p className="mt-8 text-xl text-gray-600 leading-9">

      FinSage analyzes your investment goals,
      financial profile and risk appetite to create
      diversified portfolios that maximize long-term
      returns while minimizing unnecessary risk.

    </p>

    <div className="flex flex-wrap gap-5 mt-10">

      <Link
        to="/assessment"
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
      >
        Start Assessment →
      </Link>

      <Link
        to="/about"
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition"
      >
        Learn More
      </Link>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-3 gap-8 mt-16">

      <div>

        <h2 className="text-4xl font-bold text-blue-600">
          12%
        </h2>

        <p className="text-gray-500 mt-2">
          Avg. Annual Return
        </p>

      </div>

      <div>

        <h2 className="text-4xl font-bold text-green-600">
          95%
        </h2>

        <p className="text-gray-500 mt-2">
          Diversification
        </p>

      </div>

      <div>

        <h2 className="text-4xl font-bold text-purple-600">
          10K+
        </h2>

        <p className="text-gray-500 mt-2">
          Portfolios Generated
        </p>

      </div>

    </div>

  </div>

  {/* Right Card */}

  <div className="bg-white rounded-3xl shadow-2xl p-10">

    <div className="flex justify-between items-center">

      <h2 className="text-3xl font-bold">
        AI Portfolio
      </h2>

      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
        Moderate Risk
      </span>

    </div>

    <div className="space-y-7 mt-10">

      <div>

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            📈 Stocks
          </span>

          <span className="font-bold text-blue-600">
            45%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: "45%" }}
          ></div>

        </div>

      </div>

      <div>

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            📊 ETFs
          </span>

          <span className="font-bold text-green-600">
            25%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: "25%" }}
          ></div>

        </div>

      </div>

      <div>

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            💰 Bonds
          </span>

          <span className="font-bold text-orange-500">
            15%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-orange-400 h-3 rounded-full"
            style={{ width: "15%" }}
          ></div>

        </div>

      </div>

      <div>

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            🥇 Gold
          </span>

          <span className="font-bold text-yellow-600">
            10%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-yellow-500 h-3 rounded-full"
            style={{ width: "10%" }}
          ></div>

        </div>

      </div>

      <div>

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            💵 Cash
          </span>

          <span className="font-bold text-gray-700">
            5%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-gray-500 h-3 rounded-full"
            style={{ width: "5%" }}
          ></div>

        </div>

      </div>

    </div>

    <div className="bg-blue-50 rounded-2xl p-6 mt-10">

      <h3 className="font-bold text-lg">
        AI Insight
      </h3>

      <p className="text-gray-600 mt-3 leading-7">

        Based on your financial profile,
        AI recommends a diversified
        portfolio balancing growth,
        stability and long-term wealth creation.

      </p>

    </div>

  </div>

</div>

</div>

</section>
  );
}

export default Hero;



