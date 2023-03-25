import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useRef } from "react";
import { Data } from "./Data";
import BarChart from "../Barchart/Barchart";
import axios from 'axios';
import './ChartForm.scss'
import PieChart from '../PieChart/PieChart';

Chart.register(CategoryScale);

const ChartForm = (props) => {
    const [chartData, setChartData] = useState();
    const [file, setFile] = useState()
    const chartRef = useRef(null);

    const handleClick = () => {
        const base64Image = chartRef.current.toBase64Image();
        props.addImage(base64Image)
        props.setShowChart(false)
        setChartData(null)
    }

    const cancelClick = () => {
        setChartData(null)
        props.setShowChart(false)
    }

    const upload = (e) => {
        // console.log(file)
        const data = new FormData()
        data.append('file', file)
        axios.post("http://localhost:3001/excel/upload", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                if (res.data) {
                    var newChartData = {
                        labels: res.data.chartLabel,
                        datasets: [
                            {
                                label: '# of Votes',
                                data: res.data.chartData
                            }]
                    };
                    console.log(newChartData);
                    setChartData(newChartData)
                }
            })
    }

    return (
        props.showChart ?
            <div className='Chart'>
                <div className='chart-box'>
                    {
                        chartData ?
                            chartData && props.chartType == 'bar' ?
                                < BarChart chartData={chartData} chartRef={chartRef} />
                                :
                                chartData && props.chartType == 'pie' ?
                                    <PieChart chartData={chartData} chartRef={chartRef} />
                                    :
                                    null :
                            < div className="form-group">
                                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                <button onClick={upload}>Upload</button>
                            </div>
                    }
                    <img id="url" />
                    <div className='buttons'>
                        <div className='save' onClick={handleClick}>Save</div>
                        <div className='cancel' onClick={cancelClick}>Cancel</div>
                    </div>
                </div>
            </div >
            : null
    )
}

export default ChartForm