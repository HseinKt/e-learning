import { redirect } from "react-router-dom";
import Logo from "./logo";

const Header = () => {
    return ( 
        <header className="header">
            <Logo />
            <h1>E-LEARNING</h1>
            <div className="LogReg">
                <button className="login btn" onClick={() => redirect("login")}>Login</button>
                <button className="register btn" onClick={() => redirect("register")}>Register</button>
            </div>
        </header>
     );
}
 
export default Header;