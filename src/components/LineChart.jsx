import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

// Let's check imports in LineChart: "import { Line } from 'react-chartjs-2';"
import { Line as ChartJSLine } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Portfolio Growth (₹)",
        data: [100000, 104000, 108500, 111000, 118000, 126000, 134000],
        borderColor: "#6366f1", // indigo-500
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#06b6d4", // cyan-500
        pointBorderColor: "#fff",
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#9ca3af", // gray-400
          font: {
            family: "'Inter', sans-serif",
            weight: "600"
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)"
        },
        ticks: {
          color: "#9ca3af"
        }
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)"
        },
        ticks: {
          color: "#9ca3af"
        }
      }
    }
  };

  return <ChartJSLine data={data} options={options} />;
}