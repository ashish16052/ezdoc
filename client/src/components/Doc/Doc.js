import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './Doc.scss'
import Chart from '../ChartForm/ChartForm'

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

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuill(q)
    }, [])

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


    const openChart = () => {
        console.log(index);
        setShowChart(true)
    }

    return (
        <div className='Doc'>
            <Chart showChart={showChart} setShowChart={setShowChart} addImage={addImage} />
            <div className='sidebar'>
                <h2>Insert Chart</h2>
                <p onClick={openChart}>Histogram</p>
                <p onClick={openChart}>Pie chart</p>
                <p onClick={openChart}>Confusion matrix</p>
            </div>
            <div className='Container' ref={wrapperRef}></div>
        </div>
    )
}

export default Doc