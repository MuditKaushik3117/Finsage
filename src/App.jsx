import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Recommendation from "./pages/Recommendation";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import Rebalancing from "./pages/Rebalancing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AIAssistant from "./components/AIAssistant";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
        <Route path="/recommendation" element={<ProtectedRoute><Recommendation /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
        <Route path="/rebalancing" element={<ProtectedRoute><Rebalancing /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
      </Routes>
      <AIAssistant />
    </>
  );
}

export default App;
