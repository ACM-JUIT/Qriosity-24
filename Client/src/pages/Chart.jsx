import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import useGetChart from "../services/useGetChart";

Chart.register(...registerables);

function ChartLeaderboard() {
  const { data, loading } = useGetChart();

  console.log(data);

  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (!loading) {
      setChartData({ labels: data.labels, datasets: data });
    }
  }, [data, loading]);

  return (
    <div>
      {loading === false ? (
        <div className="m-4 mt-8 rounded-md backdrop-filter backdrop-blur-sm border border-gray-500 flex flex-col bg-opacity-50">
          <h3 className="text-white mx-auto text-2xl p-4">
            {" "}
            Performance Graph{" "}
          </h3>
          <div className="lineChart">
            <Line
              data={{
                labels: Array.from({ length: 27 }, (_, index) => index),
                datasets: data.map((participant) => ({
                  label: participant.name,
                  data: participant.time,
                  fill: false,
                  stepped: "after",
                  borderColor: `rgba(${Math.random() * 255}, ${
                    Math.random() * 255
                  }, ${Math.random() * 255}, 1)`,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderWidth: 3,
                })),
              }}
              options={{
                pointDotRadius: 6,
                pointDotStrokeWidth: 2,
                datasetStrokeWidth: 3,
                scaleShowVerticalLines: false,
                scaleGridLineWidth: 2,
                scaleShowGridLines: true,
                scaleGridLineColor: "rgba(0, 0, 0, 0.05)",
                scaleOverride: true,
                scaleSteps: 9,
                scaleStepWidth: 500,
                scaleStartValue: 0,
                responsive: true,
                interaction: {
                  mode: "index",
                  intersect: false,
                },
                scales: {
                  x: {
                    type: "linear",
                    position: "bottom",
                    ticks: {
                      stepSize: 1,
                      callback: function (value) {
                        return `${value}`;
                      },
                    },
                  },
                  y: {
                    type: "linear",
                    position: "left",
                    ticks: {
                      stepSize: 15,
                      callback: function (value) {
                        const hours = Math.floor(value / 60) + 6;
                        const minutes = value % 60;
                        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
                      },
                    },
                  },
                },
                layout: {
                  padding: {
                    left: 10,
                    right: 20,
                    top: 5,
                    bottom: 15,
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                    align: "center",
                    labels: {
                      background: "rgba(255, 255, 255, 0.8)",
                      padding: 20,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ChartLeaderboard;
