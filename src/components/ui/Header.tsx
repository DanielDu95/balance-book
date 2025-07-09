import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuthContext } from "../../contexts/AuthContext"; // Assuming your context provides user info

export default function Header() {
  const { user, signOut: logout } = useAuthContext(); // Access the logged-in user from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userName =
    user?.user_metadata?.username ||
    (user?.email ? user.email.split("@")[0] : "Guest");

  return (
    <header className="bg-background-2 text-[var(--color-foreground)] shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Mobile Hamburger Icon */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-foreground-2 hover:text-accent-1 transition-colors"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Center: Navigation Links (only visible on large screens) */}
      <nav className="hidden lg:flex space-x-6 font-bold text-foreground-2">
        <a href="/" className="hover:text-accent-1">
          Dashboard
        </a>
        <a href="/transactions" className="hover:text-accent-1">
          Transactions
        </a>
        <a href="/profile" className="hover:text-accent-1">
          Profile
        </a>
      </nav>

      {/* Right: User Info */}
      {user ? (
        <div className="flex items-center gap-4">
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-[var(--color-background-2)] flex items-center justify-center">
            {user?.user_metadata?.avatar ? (
              <img
                src={user.user_metadata.avatar}
                alt="User Avatar"
                className="w-full h-full rounded-full"
              />
            ) : (
              <FaUserCircle
                size={24}
                className="text-[var(--color-foreground)]"
              />
            )}
          </div>
          {/* User Name or Email */}
          <span className="font-medium text-foreground-2">{userName}</span>

          {/* Logout Button */}
          {/* Logout Button */}
          <button
            onClick={logout}
            className="text-muted-1 hover:text-[var(--color-destructive)]"
          >
            <FaSignOutAlt size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <a href="/login" className="text-accent-2 hover:text-accent-1">
            Login
          </a>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden font-bold text-foreground-2 ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 bg-background-1 text-center py-4 z-10 transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          minHeight: "100px", // Adjust this value based on your header height
        }}
      >
        <a
          href="/"
          className="block py-2  hover:text-primary-1"
          onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
        >
          Dashboard
        </a>
        <a
          href="/transactions"
          className="block py-2  hover:text-primary-1"
          onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
        >
          Transactions
        </a>
        <a
          href="/profile"
          className="block py-2  hover:text-primary-1"
          onClick={() => setIsMenuOpen(false)} // Close the menu when a link is clicked
        >
          Profile
        </a>
      </div>
    </header>
  );
}
