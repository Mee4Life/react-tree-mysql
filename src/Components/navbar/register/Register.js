import React, { useState } from 'react'
import './register.css'
import postData from '../../../utils/PostRequest'

function Register(props) {
    const p = props.p
    const userController = props.userController
    const [inProg, setInProg] = useState(false)
    const [success, setSuccess] = useState(null)
    const [err, setErr] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPass] = useState(null)
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)


    return (
        <div className="modal-wrapper">
            <div className="register-modal">
                <div className="register-modal-header">
                    <div className="register-modal-title">Me 4 Life &nbsp;|&nbsp;  Register</div>
                    <span className='register-modal-close' onClick={() => p.setIsRegister(false)}><i className="fas fa-times"></i></span>
                </div>
                {!success &&
                    <div className="register-form">
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="first name" onChange={(e) => setFname(e.target.value)} />
                        <input type="text" placeholder="last name" onChange={(e) => setLname(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                        {err &&
                            <div className="error-container">
                                {err}
                            </div>
                        }
                        {!inProg &&
                            <span className="register-submit" onClick={handleRegister}>Register </span>
                        }
                        {inProg &&
                            <div className="spinnerContainer" style={{ marginTop: 24 }}>
                                <i className="fas fa-spinner login-spinner"></i>
                            </div>
                        }
                    </div>
                }
                {success &&
                    <div className="register-success">
                        <i className="fas fa-check-circle register-success-icon"></i>
                        <span></span>
                        <div className="register-success-msg">
                            Welcome <b>{userController.userCard.fname}</b> ,
                            <br />
                            <br />
                            Contact <a href="mailto:hazim6163@gmail.com">Admin</a> to activate your Account.</div>
                    </div>
                }
            </div>
        </div>
    )

    function handleRegister() {
        setInProg(true)
        const url = p.apiBase2 + '/users/register'
        const data = { email, password, fname, lname }
        postData(url, data)
            .then(res => {
                if (res.msg) {
                    userController.setUserCard({fname: data.fname, lname: data.lname, email: data.email})
                    setSuccess(true)
                    setInProg(false)
                }
                else {
                    if (res.error)
                        setErr(res.error)
                    if (res.errMsg)
                        setErr(res.errMsg)
                    setInProg(false)
                    setTimeout(() => {
                        setErr(null)
                    }, 2000);
                }
            })
    }
}

export default Register
