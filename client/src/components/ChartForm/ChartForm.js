import React from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useRef } from "react";
import { Data } from "./Data";
import BarChart from "../Barchart/Barchart";
import './ChartForm.scss'

Chart.register(CategoryScale);

const ChartForm = (props) => {
    const [chartData, setChartData] = useState();
    const [file, setFile] = useState()
    const chartRef = useRef(null);

    const handleClick = () => {
        const base64Image = chartRef.current.toBase64Image();
        props.addImage(base64Image)
        props.setShowChart(false)
    }

    const upload = (e) => {
        console.log(file)
    }

    return (
        props.showChart ?
            <div className='Chart'>
                <div className='chart-box'>
                    {
                        chartData ?
                            <BarChart chartData={chartData} chartRef={chartRef} /> :
                            <div className="form-group">
                                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                                <button onClick={upload}>Upload</button>
                            </div>
                    }
                    <img id="url" />
                    <div className='save' onClick={handleClick}>Save</div>
                </div>
            </div>
            : null
    )
}

export default ChartForm