import React from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import AdminPage from "./components/AdminPage/AdminPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// This is the main app component, it contains the home page and admin page
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <HomePage /> } />
        <Route path="/admin" element={ <AdminPage /> } />
      </Routes>
    </Router>
  );
}

// exporting the app component
export default App;