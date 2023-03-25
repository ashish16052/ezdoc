import React from 'react'
import './Login.scss'

const Login = () => {
    const signIn = () => {
        window.open(`http://localhost:3001/auth/login`, "_self");
    }

    return (
        <div className='login'>
            <div onClick={signIn} className='sign'>Sign In</div>
        </div>
    )
}

export default Login