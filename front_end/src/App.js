import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing_page";
import WithdrawingPage from "./pages/withdrawing_page";
import EnrollingPage from "./pages/enrolling_page";
import Login from "./components/login_page/login";
import Register from "./components/register_page/register";
import NotFound from "./components/not_fount/not_found";

function App() {
  return (
    <Routes>
      <Route path="/enroll" element={ <EnrollingPage /> }/>
      <Route path="/withdraw" element={ <WithdrawingPage /> }/>
      <Route path="login" element={ <Login /> } />
      <Route path="register" element={ <Register /> } />
      <Route path="/" element={ <LandingPage /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
