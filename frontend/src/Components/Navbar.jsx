import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-emerald-900 border-b border-emerald-800 shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-white"
        >
          Helpora
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-white">

          <Link to="/" className="hover:text-teal-300 transition-colors">
            Home
          </Link>

          <Link to="/about" className="hover:text-emerald-200 transition-colors">
            About
          </Link>

          <Link to="/search" className="hover:text-emerald-200 transition-colors">
            Services
          </Link>

          <Link to="/login" className="hover:text-emerald-200 transition-colors">
            Login
          </Link>

        </div>

        {/* Sign Up Button */}
        <div className="hidden md:flex">

          <Link
            to="/register"
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Sign Up
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-emerald-800 px-6 py-5 space-y-4 text-white">

          <Link to="/" onClick={closeMenu} className="block hover:text-emerald-200">
            Home
          </Link>

          <Link to="/about" onClick={closeMenu} className="block hover:text-emerald-200">
            About
          </Link>

          <Link to="/search" onClick={closeMenu} className="block hover:text-emerald-200">
            Services
          </Link>

          <Link to="/login" onClick={closeMenu} className="block hover:text-emerald-200">
            Login
          </Link>

          <Link
            to="/register"
            onClick={closeMenu}
            className="block bg-emerald-600 hover:bg-emerald-500 text-center py-2 rounded-lg"
          >
            Sign Up
          </Link>

        </div>
      )}

    </nav>
  );
}

export default Navbar;