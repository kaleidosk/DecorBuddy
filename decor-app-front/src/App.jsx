import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<IsAnon><SignupPage /></IsAnon>} /> 
        <Route exact path="/login" element={<IsAnon><LoginPage /></IsAnon>}/>       
      </Routes>
    </div>
  );
}

export default App;