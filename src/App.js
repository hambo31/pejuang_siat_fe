import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FilmPage from "./pages/FilmPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/film/:id" element={<FilmPage />} />
      </Routes>
    </Router>
  );
};

export default App;
