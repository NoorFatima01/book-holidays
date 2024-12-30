import { Link } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import SignOutButton from "./signout-button";
import ToggleRole from "./toggle-role";

const Header = () => {
  const { isLogged, role } = useAppContext();
  console.log("role", role);

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLogged ? (
            <>
              {role === 1 ? (
                <Link
                  to="/my-bookings"
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                >
                  My Bookings
                </Link>
              ) : (
                <Link
                  to="/my-hotels"
                  className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                >
                  My Hotels
                </Link>
              )}
              <ToggleRole />
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-300"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
