import { useNavigate } from "react-router-dom";
import Logo from "./logo";

const Header = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("../login");
    }
    
    if(token) {
        return ( 
            <header className="header">
                <Logo />
                <h1>E-LEARNING</h1>
                <div className="LogReg">
                    <button className="login btn" onClick={() => handleLogout()}>Logout</button>
                </div>
            </header>
         );
    }
    else {
        return ( 
            <header className="header">
                <Logo />
                <h1>E-LEARNING</h1>
                <div className="LogReg">
                    <button className="login btn" onClick={() => navigate("../login")}>Login</button>
                    <button className="register btn" onClick={() => navigate("../register")}>Register</button>
                </div>
            </header>
         );
    }
    
}
 
export default Header;