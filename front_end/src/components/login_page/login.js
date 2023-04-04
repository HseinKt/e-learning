import { useRef } from "react"

const Login = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const sendData = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
    }

    return (
        <div className="lgn-container">
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <div className="login-form">
                    <div>
                        <label htmlFor="email">Enter your Email</label>
                        <input id="email" placeholder="Email" ref={emailRef}/>
                    </div>
                    <div>
                        <label htmlFor="password">Enter your Password</label>
                        <input id="password" type="password" placeholder="Password" ref={passwordRef}/>
                    </div>
                    <button type="submit" className="login-button" id="login-button" onClick={sendData}>Login</button>
                    <div className="register-link">
                         <a href="/register">does't have an account</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;