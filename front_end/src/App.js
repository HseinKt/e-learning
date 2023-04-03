import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing_page";
import WithdrawingPage from "./pages/withdrawing_page";
import EnrollingPage from "./pages/enrolling_page";

function App() {
  return (
    <Routes>
      <Route path="/enroll" element={ <EnrollingPage /> }/>
      <Route path="/withdraw" element={ <WithdrawingPage /> }/>
      <Route path="/" element={ <LandingPage /> } />
    </Routes>
  );
}

export default App;
