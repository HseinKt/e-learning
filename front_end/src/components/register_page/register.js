import { useRef } from "react"

const Register = () => {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    const sendData = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
    }

    return (
        <div className="reg-container">
            <div className="register-container">
                <h1 className="register-title">Register</h1>
                <div className="register-form">
                    <div>
                        <label htmlFor="name">Enter your Name </label>
                        <input type="text" id="name" placeholder="Name" ref={nameRef}/>
                    </div>
                    <div>
                        <label htmlFor="email">Enter your Email</label>
                        <input id="email" placeholder="Email" ref={emailRef}/>
                    </div>
                    <div>
                        <label htmlFor="password">Enter your Password</label>
                        <input id="password" type="password" placeholder="Password" ref={passwordRef}/>
                    </div>
                    <div>
                        <label htmlFor="confirm_password">Confirm your Password</label>
                        <input id="confirm_password" type="password" placeholder="Confirm Password" ref={confirmPasswordRef}/>
                    </div>
                    <button type="submit" className="register-button" id="register-button" onClick={sendData}>Register</button>
                    <div className="register-link">
                        <a href="/login">Already registered? </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register