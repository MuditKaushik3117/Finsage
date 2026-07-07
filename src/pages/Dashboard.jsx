import Navbar from "../components/Navbar";
import InfoCard from "../components/InfoCard";
import PerformanceCard from "../components/PerformanceCard";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import InvestmentCard from "../components/InvestmentCard";
import Insights from "../components/Insights";
import ExportButton from "../components/ExportButton";


function Dashboard() {
  const user = JSON.parse(localStorage.getItem("portfolioUser"));
  const portfolio = JSON.parse(localStorage.getItem("portfolio"));

  if (!user || !portfolio) {
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

  return (
    <>
      <Navbar />

      <div className="bg-slate-100 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            Portfolio Dashboard
          </h1>
          <div className="mt-6">

    <ExportButton />

</div>

          <p className="text-gray-600 mt-3 text-lg">
            Welcome back, <span className="font-semibold">{user.name}</span>
          </p>

          {/* Summary Cards */}

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <InfoCard
              title="Portfolio Value"
              value="₹15,24,380"
            />

            <InfoCard
              title="Expected Return"
              value={portfolio.expectedReturn}
            />

            <InfoCard
              title="Risk Level"
              value={portfolio.riskLevel}
            />

            <InfoCard
              title="Investment Goal"
              value={user.goal}
            />

          </div>

          {/* Performance */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <PerformanceCard
              title="1 Year Return"
              value="+14.2%"
              color="text-green-600"
            />

            <PerformanceCard
              title="Sharpe Ratio"
              value="1.87"
              color="text-blue-600"
            />

            <PerformanceCard
              title="Diversification"
              value="95%"
              color="text-purple-600"
            />

          </div>

          {/* Charts */}

          <div className="grid lg:grid-cols-2 gap-8 mt-12">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Portfolio Allocation
              </h2>

              <PieChart portfolio={portfolio} />

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Asset Allocation
              </h2>

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-3">
                      Asset
                    </th>

                    <th className="text-right">
                      Allocation
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">
                    <td className="py-4">📈 Stocks</td>
                    <td className="text-right">{portfolio.Stocks}%</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-4">📊 ETFs</td>
                    <td className="text-right">{portfolio.ETFs}%</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-4">🏦 Bonds</td>
                    <td className="text-right">{portfolio.Bonds}%</td>
                  </tr>

                  <tr className="border-b">
                    <td className="py-4">🥇 Gold</td>
                    <td className="text-right">{portfolio.Gold}%</td>
                  </tr>

                  <tr>
                    <td className="py-4">💵 Cash</td>
                    <td className="text-right">{portfolio.Cash}%</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* Growth Chart */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">

            <h2 className="text-2xl font-bold mb-6">
              Portfolio Growth
            </h2>

            <LineChart />

          </div>

          {/* Investment Suggestions */}

          <h2 className="text-4xl font-bold mt-16">
            Recommended Investments
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <InvestmentCard
              title="Nifty 50 ETF"
              type="ETF"
              risk="Low"
              returns="11%"
            />

            <InvestmentCard
              title="HDFC Flexi Cap Fund"
              type="Mutual Fund"
              risk="Moderate"
              returns="14%"
            />

            <InvestmentCard
              title="Gold ETF"
              type="Commodity"
              risk="Low"
              returns="8%"
            />

          </div>

          {/* AI Insights */}

          <div className="mt-12">

            <Insights user={user} />

          </div>

          {/* Investor Profile */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">

            <h2 className="text-2xl font-bold mb-6">
              Investor Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Age:</strong> {user.age}
              </p>

              <p>
                <strong>Income:</strong> ₹
                {Number(user.income).toLocaleString()}
              </p>

              <p>
                <strong>Savings:</strong> ₹
                {Number(user.savings).toLocaleString()}
              </p>

              <p>
                <strong>Goal:</strong> {user.goal}
              </p>

              <p>
                <strong>Risk Appetite:</strong> {user.risk}
              </p>

              <p>
                <strong>Investment Horizon:</strong> {user.horizon}
              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;




