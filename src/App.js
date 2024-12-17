// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Navbar from "./components/Navbar"; // Import Navbar
import CreateQuiz from "./assets/CreateQuiz";

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Add Navbar for navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
