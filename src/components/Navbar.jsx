import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const loadUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token", error);
        handleLogout();
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserFromToken();
    window.addEventListener("userLoggedIn", loadUserFromToken);
    window.addEventListener("userLoggedOut", () => setUser(null));
    return () => {
      window.removeEventListener("userLoggedIn", loadUserFromToken);
      window.removeEventListener("userLoggedOut", () => setUser(null));
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("userLoggedOut"));
    navigate("/login");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" aria-label="Go to homepage">
          <img src="/Logo1.webp" alt="Finderight logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-blue-600">Finderight</span>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="focus:outline-none"
          >
            {menuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">Jobs</Link>
          <Link to="/study-news" className="text-gray-700 hover:text-blue-600">Study News</Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
                aria-expanded={dropdownOpen}
                className="text-2xl text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <FaUserCircle />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-md z-50"
                  role="menu"
                  aria-label="User dropdown"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-4 py-2 md:hidden"
            role="menu"
          >
            <Link to="/" className="py-2 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/jobs" className="py-2 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Jobs</Link>
            <Link to="/study-news" className="py-2 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Study News</Link>

            {user ? (
              <>
                <Link to="/profile" className="py-2 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="py-2 text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="py-2 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Signup</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
