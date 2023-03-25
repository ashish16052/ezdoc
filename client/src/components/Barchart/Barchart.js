import { Bar } from "react-chartjs-2";
const BarChart = ({ chartData, chartRef }) => {
    return (
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={chartData}
                ref={chartRef}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Monthly Salary"
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            barPercentage: 1.3,
                            ticks: {
                                max: 3,
                            }
                        }, {
                            display: true,
                            ticks: {
                                autoSkip: false,
                                max: 4,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                }}
            />
        </div>
    );
};

export default BarChart