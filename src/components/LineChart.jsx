import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  } from "chart.js";
  
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );
  
  function LineChart() {
  
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul"
      ],
  
      datasets: [
        {
          label: "Portfolio Growth",
          data: [
            100000,
            104000,
            108500,
            111000,
            118000,
            126000,
            134000
          ],
          borderColor: "#2563EB",
          fill: false,
          tension: 0.4
        }
      ]
    };
  
    return <Line data={data} />;
  }
  
  export default LineChart;

  