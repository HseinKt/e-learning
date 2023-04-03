import { redirect } from "react-router-dom";

const Header = () => {
    return ( 
        <header className="header">
            logo
            <h1>E-Learning</h1>
            <div>
                <button className="login" onClick={() => redirect("login")}>Login</button>
                <button className="register" onClick={() => redirect("register")}>Register</button>
            </div>
        </header>
     );
}
 
export default Header;