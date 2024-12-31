import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import SignOutButton from "./signout-button";

const Header = () => {
  const { isLogged } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-blue-800 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <span className="text-2xl sm:text-3xl text-white font-bold tracking-tight">
          <Link to="/">BookHolidays.com</Link>
        </span>

        <button
          onClick={toggleMenu}
          className="block lg:hidden text-white hover:text-gray-300 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full lg:w-auto flex-grow lg:flex lg:items-center lg:justify-end`}
        >
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
            {isLogged ? (
              <>
                <Link
                  to="/my-bookings"
                  className="text-white px-3 py-2 font-bold hover:bg-blue-600 rounded"
                >
                  My Bookings
                </Link>
                <Link
                  to="/my-hotels"
                  className="text-white px-3 py-2 font-bold hover:bg-blue-600 rounded"
                >
                  My Hotels
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="bg-white text-blue-600 px-3 py-2 font-bold hover:bg-gray-300 rounded"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
