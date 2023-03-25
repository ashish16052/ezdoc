import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './Doc.scss'
import Chart from '../ChartForm/ChartForm'
import { saveAs } from 'file-saver';
import { pdfExporter } from 'quill-to-pdf';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

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

const Doc = (props) => {
    const { id } = useParams()
    const navigate = useNavigate();
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

    const loadDoc = async () => {
        console.log(props.type);
        if (props.type == 'doc') {
            const docs = await axios.get(`http://localhost:3001/doc/findone/${id}`)
            if (quill) {
                quill.updateContents(docs.data.delta)
            }
        }
        else if (props.type == 'boiler') {
            const docs = await axios.get(`http://localhost:3001/boiler/findone/${id}`)
            if (quill) {
                quill.updateContents(docs.data.delta)
            }
        }
    }

    useEffect(() => {
        loadDoc()
    }, [quill])



    const addImage = (url,chartType) => {
        var tempData = quill.getContents()
        console.log(tempData);
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
        if (props.type == 'doc') {
            axios.post("http://localhost:3001/doc/save", {
                _id: id,
                userId: props.user._id,
                delta: quill.getContents()
            }, {
            })
                .then(res => {
                    console.log(res.data);
                })
        }
        else if (props.type == 'boiler') {
            axios.post("http://localhost:3001/boiler/save", {
                _id: id,
                userId: props.user._id,
                delta: quill.getContents()
            }, {
            })
                .then(res => {
                    console.log(res.data);
                })
        }
    }

    const openChart = (type) => {
        setChartType(type)
        // console.log(index);
        setShowChart(true)
    }

    const goHome = () => {
        navigate('/');
    }

    return (
        <div className='Doc'>
            <Chart chartType={chartType} showChart={showChart} setShowChart={setShowChart} addImage={addImage} />
            <div className='sidebar'>
                <h1 className='logo' onClick={goHome}>📄EzDoc</h1>

                <p onClick={saveData}>Save Document</p>
                <p onClick={clicksave}>Export PDF</p>
                <h2>Insert Chart</h2>
                <p onClick={() => openChart('bar')}>Histogram</p>
                <p onClick={() => openChart('pie')}>Pie chart</p>
                <p onClick={() => openChart('matrix')}>Confusion matrix</p>
            </div>
            <div className='Container' ref={wrapperRef}></div>
        </div>
    )
}

export default Doc