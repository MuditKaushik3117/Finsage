import Navbar from "../components/Navbar";

const marketData = [
  {
    name: "NIFTY 50",
    price: "25,180.40",
    change: "+1.32%",
    color: "text-green-600",
    description: "India's benchmark equity index."
  },
  {
    name: "SENSEX",
    price: "82,560.70",
    change: "+0.94%",
    color: "text-green-600",
    description: "Top 30 companies listed on BSE."
  },
  {
    name: "NASDAQ",
    price: "22,500.15",
    change: "+0.82%",
    color: "text-green-600",
    description: "Technology-focused US market index."
  },
  {
    name: "Gold",
    price: "₹9,850 / gram",
    change: "-0.25%",
    color: "text-red-600",
    description: "Safe-haven asset during volatility."
  },
  {
    name: "Bitcoin",
    price: "$108,400",
    change: "+3.20%",
    color: "text-green-600",
    description: "Largest cryptocurrency by market cap."
  },
  {
    name: "USD / INR",
    price: "₹85.72",
    change: "+0.12%",
    color: "text-green-600",
    description: "Current US Dollar exchange rate."
  }
];

const news = [
  "RBI keeps repo rate unchanged to support economic growth.",
  "NIFTY 50 reaches a fresh all-time high amid strong buying.",
  "Gold prices remain stable despite global inflation concerns.",
  "Technology stocks continue outperforming broader markets.",
  "Foreign Institutional Investors increase investments in Indian equities.",
  "Experts recommend portfolio diversification amid market volatility."
];

const tips = [
  {
    title: "Diversify Investments",
    text: "Avoid investing your entire portfolio in a single asset class."
  },
  {
    title: "Invest for the Long Term",
    text: "Long-term investing helps reduce short-term market volatility."
  },
  {
    title: "Review Regularly",
    text: "Rebalance your portfolio every 6–12 months."
  }
];

function Market() {
  return (
    <>
      <Navbar />

      <div className="bg-slate-100 min-h-screen py-12">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Market Outlook
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Monitor major financial markets and stay updated with investment trends.
          </p>

          {/* Market Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

            {marketData.map((item) => (

              <div
                key={item.name}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300"
              >

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-4xl font-bold mt-5">
                  {item.price}
                </p>

                <p className={`mt-3 font-semibold ${item.color}`}>
                  {item.change}
                </p>

                <p className="text-gray-500 mt-5">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

          {/* Market Headlines */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-16">

            <h2 className="text-3xl font-bold mb-8">
              📰 Market Headlines
            </h2>

            <div className="space-y-5">

              {news.map((headline, index) => (

                <div
                  key={index}
                  className="border-b pb-4"
                >

                  <p className="font-medium">
                    {headline}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Investment Tips */}

          <div className="mt-16">

            <h2 className="text-3xl font-bold">
              Investment Tips
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              {tips.map((tip) => (

                <div
                  key={tip.title}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >

                  <h3 className="text-2xl font-bold">
                    {tip.title}
                  </h3>

                  <p className="text-gray-600 mt-4">
                    {tip.text}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* AI Market Summary */}

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mt-16">

            <h2 className="text-3xl font-bold">
              🤖 AI Market Summary
            </h2>

            <p className="mt-6 text-gray-700 leading-8">

              Current market indicators suggest a moderately bullish outlook.
              Equity markets continue to perform well while gold remains a
              stable hedge against uncertainty. Investors with a long-term
              investment horizon may consider maintaining diversified exposure
              across equities, ETFs, debt instruments, commodities, and cash.

            </p>

          </div>

          {/* Disclaimer */}

          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mt-12">

            <h2 className="text-xl font-bold">
              Disclaimer
            </h2>

            <p className="mt-4 text-gray-700">

              Market prices, news, and analytics displayed in this project are
              sample data for educational purposes. They do not represent
              real-time financial information or investment advice.

            </p>

          </div>

        </div>

      </div>

    </>
  );
}

export default Market;


