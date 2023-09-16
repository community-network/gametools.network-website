import * as React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import { useTranslation } from "react-i18next";
import { GlobalGraphReturn } from "../../api/GametoolsApi";

ChartJS.register(
  zoomPlugin,
  ArcElement,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

interface NewGraphData {
  stats: GlobalGraphReturn;
  chartValues: string;
}

export function ServerPieChart(props: NewGraphData): React.ReactElement {
  const { t } = useTranslation();
  const data = {
    labels:
      Object.keys(props.stats ? props.stats[props.chartValues] : []) || [],
    datasets: [
      {
        label: t("servers.graph.amount"),
        data: Object.values(props.stats ? props.stats[props.chartValues] : []),
        backgroundColor: [
          "#7fffd4",
          "#458b74",
          "#f0ffff",
          "#838b8b",
          "#ffe4c4",
          "#0000ff",
          "#8a2be2",
          "#a52a2a",
          "#ff4040",
          "#ffd39b",
          "#8b7355",
          "#98f5ff",
          "#53868b",
          "#7fff00",
          "#d2691e",
          "#4a4a4a",
          "#eea2ad",
          "#8b3e2f",
          "#6495ed",
          "#00ffff",
          "#ffb90f",
          "#006400",
          "#caff70",
          "#6e8b3d",
          "#c1ffc1",
          "#698b69",
          "#483d8b",
          "#2f4f4f",
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
  };

  return (
    <div>
      <Pie
        options={options}
        style={{ maxHeight: "200px", maxWidth: "200px", marginLeft: "20px" }}
        data={data}
      />
    </div>
  );
}
