import React from 'react'
import screenshot from '../../Screenshot.png'
import './Login.scss'

const Login = () => {
    const signIn = () => {
        window.open(`http://localhost:3001/auth/login`, "_self");
    }

    return (
        <div className='login'>
            <h1>📄EzDoc</h1>
            <p>Creating Documents was never so Ezz</p>
            <div onClick={signIn} className='sign'>Get started</div>
            <img src={screenshot}/>
        </div>
    )
}

export default Login