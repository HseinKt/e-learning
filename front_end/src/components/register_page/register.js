import { useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    const sendData = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        const data = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        try {
            await axios.post("http://127.0.0.1:8000/auth/register",data ,{
            headers: {
              'Content-Type': 'application/json'
            }})
            .then((response) => {
                console.log(data.data);
                navigate("/login");
            })
            .catch(error => {
                console.log("axios error "+error);
            })
        } catch (error) {
            console.log("catch error "+error);
        }
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