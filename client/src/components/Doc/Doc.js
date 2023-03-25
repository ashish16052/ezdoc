import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './Doc.scss'
import Chart from '../ChartForm/ChartForm'
import { saveAs } from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }, { font: [] }],
    [],
    ['bold', 'italic', 'underline', 'strike'],
    [],
    [{ color: [] }, { background: [] }],
    [],
    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    [],
    ['link', 'image', 'blockquote', 'code-block'],
]

const Doc = () => {
    const [quill, setQuill] = useState()
    const [index, setIndex] = useState()
    const [showChart, setShowChart] = useState(false)
    const [chartType, setChartType] = useState()

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuill(q)
    }, [])

    const clicksave = async () => {
        const delta = quill.getContents(); // gets the Quill delta
        const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
        saveAs(pdfAsBlob, 'pdf-export.pdf'); // downloads from the browser
    }



    const addImage = (url) => {
        quill.insertEmbed(index, 'image', url);
    }

    useEffect(() => {
        if (quill) {
            const handler = (delta, oldDelta, source) => {
                if (quill.getSelection() && quill.getSelection().index) {
                    setIndex(quill.getSelection().index)
                    console.log(quill.getSelection().index);
                }
            }
            quill.on('text-change', handler)
        }
    }, [quill])

    const saveData = async () => {
        console.log('save');
    }

    const openChart = (type) => {
        setChartType(type)
        console.log(index);
        setShowChart(true)
    }

    return (
        <div className='Doc'>
            <Chart chartType={chartType} showChart={showChart} setShowChart={setShowChart} addImage={addImage} />
            <div className='sidebar'>
                <h2>Insert Chart</h2>
                <p onClick={() => openChart('bar')}>Histogram</p>
                <p onClick={() => openChart('pie')}>Pie chart</p>
                <p onClick={() => openChart('matrix')}>Confusion matrix</p>
                <p onClick={saveData}>Save Document</p>
                <p onClick={clicksave}>Export PDF</p>
            </div>
            <div className='Container' ref={wrapperRef}></div>
        </div>
    )
}

export default Doc