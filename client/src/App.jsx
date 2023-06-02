import { Routes, Route } from "react-router-dom";

//import Pages
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/loginPage.jsx";

//import styling Files
import "./App.css";
import "./global/global.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("following error");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
