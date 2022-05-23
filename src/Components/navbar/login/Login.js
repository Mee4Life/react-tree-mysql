import React, { useState } from 'react'
import './login.css'
import postData from '../../../utils/PostRequest'
import Register from '../register/Register'

function Login(props) {
    const p = props.p
    const userController = props.userController
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [inProgress, setProgress] = useState(false)
    const [error, setError] = useState(null)
    const [isRegister, setIsRegister] = useState(false)
    p.isRegister = isRegister
    p.setIsRegister = setIsRegister





    const submitLogin = () => {
        // check login data > 
        if (!email || !password || email.length <= 0 || password.length <= 0) {
            setErrorMsg('Email and Password can\'t be empty. ')
            return
        }
        setProgress(true)
        const url = p.apiBase2 + '/users/login'
        const data = { email, password }
        postData(url, data)
            .then(res => {
                // store login information on success login
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    // setting the usercard:
                    localStorage.setItem('userCard', JSON.stringify({fname: data.fname, lname: data.lname, email: data.email}));
                    userController.setUserToken(res.token)
                    userController.setUserCard(res.userCard)
                }
                // set progress to false
                setProgress(false)
                if (res.error)
                    // send error msg
                    setErrorMsg(res.error)
            })
    }



    return (
        <div className={p.getCls('login-form-wrapper')}>
            <div className={p.getCls('login-form-container')}>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className={p.getCls('login-input')} placeholder='email' />
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} className={p.getCls('login-input')} placeholder="password" />
                {!inProgress &&
                    <span className={p.getCls('login-submit')} onClick={submitLogin}>Login</span>
                }
                {inProgress &&
                    <i className="fas fa-spinner login-spinner"></i>
                }
                <span className={p.getCls('login-register')} onClick={showRegisterForm}>Register</span>
            </div>
            {error &&
                <div className="error-container">
                    {error}
                </div>
            }
            {isRegister &&
                <Register p={p} userController={userController} />
            }
        </div>
    )

    function setErrorMsg(err) {
        setError(err)
        setTimeout(() => {
            setError(null)
        }, 2000)
    }

    function showRegisterForm() {
        setIsRegister(true)
    }
}

export default Login
