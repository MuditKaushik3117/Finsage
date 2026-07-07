import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Recommendation from "./pages/Recommendation";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Rebalancing from "./pages/Rebalancing";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/recommendation" element={<Recommendation />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/market" element={<Market />} />
      <Route path="/rebalancing" element={<Rebalancing />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;

