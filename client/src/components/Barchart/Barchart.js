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
                }}
            />
        </div>
    );
};

export default BarChart