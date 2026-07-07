import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/finsage-logo.png";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

 

  const navLink = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          FinSage
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={navLink}
          >
            Home
          </NavLink>

          <NavLink
            to="/assessment"
            className={navLink}
          >
            Assessment
          </NavLink>

          <NavLink
            to="/recommendation"
            className={navLink}
          >
            Recommendation
          </NavLink>

          <NavLink
            to="/dashboard"
            className={navLink}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/market"
            className={navLink}
          >
            Market
          </NavLink>

          <NavLink
            to="/rebalancing"
            className={navLink}
          >
            Rebalancing
          </NavLink>

          <NavLink
            to="/about"
            className={navLink}
          >
            About
          </NavLink>

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Navigation */}

      {menuOpen && (

        <div className="md:hidden bg-white shadow-lg">

          <div className="flex flex-col gap-5 p-6">

            <NavLink
              to="/"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/assessment"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Assessment
            </NavLink>

            <NavLink
              to="/recommendation"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Recommendation
            </NavLink>

            <NavLink
              to="/dashboard"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/market"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Market
            </NavLink>

            <NavLink
              to="/rebalancing"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              Rebalancing
            </NavLink>

            <NavLink
              to="/about"
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>

           

          </div>
          <Link to="/"
  className="flex items-center gap-3"
>
  <img
    src={logo}
    alt="FinSage"
    className="w-12 h-12 rounded-full shadow-lg"
  />

  <div>
    <h1 className="text-2xl font-bold text-slate-900">
      FinSage
    </h1>

    <p className="text-xs text-gray-500 -mt-1">
      AI Investment Advisor
    </p>
  </div>
</Link>

        </div>

      )}

    </nav>
  );
}

export default Navbar;



