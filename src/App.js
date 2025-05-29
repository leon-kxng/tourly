import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Packages from "./packages";
import PackageDetail from "./PackageDetail";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/package/:id" element={<PackageDetail />} />
    </Routes>
  </Router>
);

export default App;