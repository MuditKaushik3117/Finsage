import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import Floating3DBackground from "../components/Floating3DBackground";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await registerUser({
      name,
      email,
      password
    });

    if (data.success) {
      alert("Registration Successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <>
      <Floating3DBackground />
      <div className="min-h-screen flex justify-center items-center px-6 relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-10 border border-white/10 shadow-3xl rounded-2xl space-y-5"
          >
            <div className="text-center mb-4">
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Join FinSage to build your custom investment targets.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold px-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full glass-input rounded-xl p-3.5 outline-none text-white bg-slate-950/40"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold px-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full glass-input rounded-xl p-3.5 outline-none text-white bg-slate-950/40"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-semibold px-1">Password</label>
              <input
                type="password"
                required
                className="w-full glass-input rounded-xl p-3.5 outline-none text-white bg-slate-950/40"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 mt-2"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}
