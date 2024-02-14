import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <div style={{ width: 800, }}>
            <Line data={chartData} />
         </div>
    </div>  
)
}

export default LineChart;