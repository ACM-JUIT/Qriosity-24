import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import lineChart from "../data/lineChart";


function Chart() {
    return (
      <div className="my-16 bg-white">
        <h3 className="text-white mx-auto"> Performance Graph </h3>
        <div className="lineChart">
            <Line 
                data = {{
                    labels: Array.from({ length: 27 }, (_, index) => index ),
                    datasets: lineChart.map((participant) => ({
                        label: participant.name,
                        data: participant.quesTime,
                        fill: false,
                        stepped: "after",
                    }))
                }}
                options={{
                    scales: {
                      y: {
                        type: "linear",
                        ticks: {
                            stepSize: 15, 
                            min: 18 * 60, 
                            max: 24 * 60, 
                            callback: function (value) {
                              const hours = Math.floor(value / 60)+6;
                              const minutes = value % 60;
                              return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
                            },
                          },
                      },
                    },
                  }}
            />
        </div>
      </div>
    );
}


export default Chart;