import React from "react";
import { Pie } from "react-chartjs-2";
import './PieChart.scss'

function PieChart({ chartData, chartRef }) {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
            <Pie
                data={chartData}
                ref={chartRef}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        }
                    },
                    responsive: true
                }}
            />
        </div>
    );
}
export default PieChart;