import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing_page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
    </Routes>
  );
}

export default App;
