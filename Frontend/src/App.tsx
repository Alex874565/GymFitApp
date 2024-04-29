import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Layout/Login/Login";
import { HomePage } from "./Layout/HomePage/HomePage";
import { Register } from "./Layout/Register/Register";

function App() {
  return (
    <Router>
      <main className="App">
        {/* <Hero /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/register" element={<Register />} />{" "}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
