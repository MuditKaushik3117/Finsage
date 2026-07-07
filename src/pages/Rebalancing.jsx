import Navbar from "../components/Navbar";

function Rebalancing() {

    const portfolio =
        JSON.parse(localStorage.getItem("portfolio"));

    return (

        <>
            <Navbar />

            <div className="max-w-5xl mx-auto py-12 px-6">

                <h1 className="text-5xl font-bold">
                    Portfolio Rebalancing
                </h1>

                <div className="bg-white rounded-xl shadow-lg mt-10 p-10">

                    <table className="w-full text-lg">

                        <thead>

                            <tr className="border-b">

                                <th className="py-4 text-left">
                                    Asset
                                </th>

                                <th>
                                    Current
                                </th>

                                <th>
                                    Recommended
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td className="py-4">Stocks</td>
                                <td>{portfolio.Stocks + 5}%</td>
                                <td>{portfolio.Stocks}%</td>
                            </tr>

                            <tr>
                                <td className="py-4">ETFs</td>
                                <td>{portfolio.ETFs - 3}%</td>
                                <td>{portfolio.ETFs}%</td>
                            </tr>

                            <tr>
                                <td className="py-4">Bonds</td>
                                <td>{portfolio.Bonds - 1}%</td>
                                <td>{portfolio.Bonds}%</td>
                            </tr>

                            <tr>
                                <td className="py-4">Gold</td>
                                <td>{portfolio.Gold - 1}%</td>
                                <td>{portfolio.Gold}%</td>
                            </tr>

                            <tr>
                                <td className="py-4">Cash</td>
                                <td>{portfolio.Cash}%</td>
                                <td>{portfolio.Cash}%</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default Rebalancing;

