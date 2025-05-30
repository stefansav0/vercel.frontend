import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Function to load user from token
  const loadUserFromToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout(); // Token expired
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

  // Initial token check
  useEffect(() => {
    loadUserFromToken();

    // Listen for custom login events
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
    window.dispatchEvent(new Event("userLoggedOut")); // Notify others
    navigate("/login");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/Logo1.png" alt="FinderRight Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-blue-600">Finderight</span>
        </Link>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-4">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/study-news" className="text-gray-700 hover:text-blue-600">
            Study News
          </Link>

          {user ? (
            <div className="relative">
              <FaUserCircle
                className="text-2xl text-gray-700 cursor-pointer hover:text-blue-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
