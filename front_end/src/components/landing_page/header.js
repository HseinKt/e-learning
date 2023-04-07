import { useNavigate } from "react-router-dom";
import Logo from "./logo";

const Header = () => {
    const navigate = useNavigate();
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
 
export default Header;