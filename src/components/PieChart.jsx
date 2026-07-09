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

export default function PieChart({ portfolio }) {
  const data = {
    labels: ["Stocks", "ETFs", "Bonds", "Gold", "Cash"],
    datasets: [
      {
        data: [
          portfolio?.Stocks || 0,
          portfolio?.ETFs || 0,
          portfolio?.Bonds || 0,
          portfolio?.Gold || 0,
          portfolio?.Cash || 0
        ],
        backgroundColor: [
          "#6366f1", // indigo-500
          "#06b6d4", // cyan-500
          "#eab308", // yellow-500
          "#ec4899", // pink-500
          "#64748b"  // slate-500
        ],
        borderColor: "rgba(255, 255, 255, 0.05)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9ca3af", // gray-400
          font: {
            family: "'Inter', sans-serif",
            weight: "600"
          },
          padding: 20
        }
      }
    }
  };

  return <Pie data={data} options={options} />;
}
