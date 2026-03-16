import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Seasonal from "../pages/Seasonal";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/seasonal/:season" element={<Seasonal />} />
    </Routes>
  );
};

export default AppRoutes;
