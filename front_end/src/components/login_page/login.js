import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const sendData = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const data = {
            email: email,
            password: password,
        };

        try {
            axios.post("http://127.0.0.1:8000/auth/login",data ,{
            headers: {
              'Content-Type': 'application/json'
            }})
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                navigate("/");
            })
            .catch(error => {
                console.log(error.message);
                if( error.response && error.response.status === 404 ) {
                    const message = error.response.data.message;
                    console.log(message);
                    alert( message );
                }
                else console.log("axios error "+error);
            })
        } catch (error) {
            console.log("catch error "+error);
        }
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