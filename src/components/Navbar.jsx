import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import logo from "../assets/finsage-logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-1"
      : "text-gray-300 hover:text-indigo-400 transition pb-1";

  const mobileNavLinkStyle = ({ isActive }) =>
    isActive
      ? "text-indigo-400 font-semibold bg-white/5 px-3 py-2 rounded-lg"
      : "text-gray-300 hover:text-indigo-400 hover:bg-white/5 px-3 py-2 rounded-lg transition";

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/75 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group text-2xl font-black tracking-tight text-white"
        >
          <img
            src={logo}
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
            alt="FinSage Logo"
          />
          <span className="bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
            FinSage
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/dashboard" className={navLinkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/assessment" className={navLinkStyle}>
            Assessment
          </NavLink>

          <NavLink to="/recommendation" className={navLinkStyle}>
            Recommendation
          </NavLink>

          <NavLink to="/portfolio" className={navLinkStyle}>
            Portfolio
          </NavLink>

          <NavLink to="/market" className={navLinkStyle}>
            Market
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-gray-300">
                  {user?.name}
                </span>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl transition duration-300 text-sm font-semibold"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-300 hover:text-white px-4 py-2 text-sm font-semibold transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/5 transition text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-white/5 px-6 py-6 flex flex-col gap-4 shadow-3xl text-sm">
          <NavLink to="/" className={mobileNavLinkStyle} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/dashboard" className={mobileNavLinkStyle} onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>

          <NavLink to="/assessment" className={mobileNavLinkStyle} onClick={() => setMenuOpen(false)}>
            Assessment
          </NavLink>

          <NavLink to="/recommendation" className={mobileNavLinkStyle} onClick={() => setMenuOpen(false)}>
            Recommendation
          </NavLink>

          <NavLink to="/portfolio" className={mobileNavLinkStyle} onClick={() => setMenuOpen(false)}>
            Portfolio
          </NavLink>

          <NavLink to="/market" className={mobileNavLinkStyle} onClick={() => setMenuOpen(false)}>
            Market
          </NavLink>

          <NavLink to="/about" className={mobileNavLinkStyle} onClick={() => setMenuOpen(false)}>
            About
          </NavLink>

          <hr className="border-white/5 my-2" />

          {token ? (
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-gray-300 px-3">
                Logged in as: <span className="text-white">{user?.name}</span>
              </p>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-600/20 text-red-400 border border-red-600/20 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600/30 transition duration-300"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 px-3">
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="border border-white/10 text-gray-300 py-2.5 rounded-xl font-bold hover:bg-white/5 transition"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
                className="bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
