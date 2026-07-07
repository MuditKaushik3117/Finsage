import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieChart({ portfolio }) {

    const data = {
        labels: [
            "Stocks",
            "ETFs",
            "Bonds",
            "Gold",
            "Cash"
        ],

        datasets: [
            {
                data: [
                    portfolio.Stocks,
                    portfolio.ETFs,
                    portfolio.Bonds,
                    portfolio.Gold,
                    portfolio.Cash
                ],

                backgroundColor: [
                    "#2563EB",
                    "#10B981",
                    "#F59E0B",
                    "#EF4444",
                    "#6B7280"
                ]
            }
        ]
    };

    return (
        <Pie data={data} />
    );
}

export default PieChart;


