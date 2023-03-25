import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './Doc.scss'

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

    const wrapperRef = useCallback(wrapper => {
        if (!wrapper) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } })
        setQuill(q)
    }, [])

    return (
        <div className='Doc'>
            <div className='sidebar'>
                <h2>Insert Chart</h2>
                <p>Histogram</p>
                <p>Pie chart</p>
                <p>Confusion matrix</p>
            </div>
            <div className='Container' ref={wrapperRef}></div>
        </div>
    )
}

export default Doc