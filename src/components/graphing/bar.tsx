import * as React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LinearScale } from "chart.js";
import { useTranslation } from "react-i18next";
import { CategoryScale } from "chart.js";

ChartJS.register(CategoryScale, BarElement, LinearScale);

interface GraphData {
  loading: boolean;
  error: boolean;
  names: string[];
  values: number[];
  valueName: string;
}

export function BarGraph(props: GraphData): React.ReactElement {
  const { t } = useTranslation();
  const data = {
    labels: props.names,
    datasets: [
      {
        label: t(`stats.rows.${props.valueName}`),
        data: props.values,
        backgroundColor: [
          "rgba(20, 254, 212, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(20, 254, 212, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.65)",
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.65)",
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
}
