import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import lineChart from "../data/lineChart";

const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function Chart() {
    return (
      <div className="m-4 mt-8 rounded-md backdrop-filter backdrop-blur-sm border border-gray-500 flex flex-col bg-opacity-50">
        <h3 className="text-white mx-auto text-2xl p-4"> Performance Graph </h3>
        <div className="lineChart">
            <Line 
                data = {{
                    labels: Array.from({ length: 27 }, (_, index) => index ),
                    datasets: lineChart.map((participant) => ({
                        label: participant.name,
                        data: participant.quesTime,
                        fill: false,
                        stepped: "after",
                        borderColor: participant.color,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        borderWidth: 3
                    }))
                }}
                options={{
                    pointDotRadius : 6,
                    pointDotStrokeWidth : 2,
                    datasetStrokeWidth : 3,
                    scaleShowVerticalLines: false,
                    scaleGridLineWidth : 2,
                    scaleShowGridLines : true,
                    scaleGridLineColor : "rgba(0, 0, 0, 0.05)",
                    scaleOverride: true,
                    scaleSteps: 9,
                    scaleStepWidth: 500,
                    scaleStartValue: 0,
                    responsive: true,
                    interaction: {
                        mode: 'index',
                        intersect: false
                      },
                    scales: {
                      y: {
                        type: "linear",
                        ticks: {
                            stepSize: 15, 
                            // min: 6 * 60, 
                            // max: 13 * 60, 
                            callback: function (value) {
                              const hours = Math.floor(value / 60)+6;
                              const minutes = value % 60;
                              return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
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
                            position: 'top',
                            align: 'center',
                            labels: {
                                background: 'rgba(255, 255, 255, 0.8)',
                                padding: 20,
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