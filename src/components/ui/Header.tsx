import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Header() {
  const { user, signOut: logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  const userName =
    user?.user_metadata?.username ||
    (user?.email ? user.email.split("@")[0] : "Guest");

  return (
    <header className="bg-background-2 text-foreground-1 shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Mobile Hamburger Icon */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-foreground-2 hover:text-accent-1 transition-colors"
        aria-label="Toggle navigation"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Center: Navigation Links (Desktop) */}
      <nav className="hidden lg:flex space-x-6 font-bold text-foreground-2">
        <Link to="/" className="hover:text-accent-1">
          Dashboard
        </Link>
        <Link to="/transactions" className="hover:text-accent-1">
          Transactions
        </Link>
      </nav>

      {/* Right Section: Dark Mode, User Info */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-background-3 transition-colors text-muted-1 hover:text-accent-1"
          title="Toggle Dark Mode"
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-background-3 flex items-center justify-center">
          {user?.user_metadata?.avatar ? (
            <img
              src={user.user_metadata.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle size={24} className="text-foreground-1" />
          )}
        </div>

        {/* Username */}
        <span className="font-medium text-foreground-2">{userName}</span>

        {/* Logout */}
        <button
          onClick={logout}
          className="text-muted-1 hover:text-destructive transition-colors"
          title="Logout"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden font-bold text-foreground-2 ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 bg-background-1 text-center py-4 z-10 transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          minHeight: "100px",
        }}
      >
        <Link
          to="/"
          className="block py-2 hover:text-primary-1"
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className="block py-2 hover:text-primary-1"
          onClick={() => setIsMenuOpen(false)}
        >
          Transactions
        </Link>
      </div>
    </header>
  );
}
