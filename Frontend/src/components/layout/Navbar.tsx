import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../zustand/authStore";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="col-start-1 col-end-7 flex justify-between items-center mt-2">
      <ul className="grid grid-cols-9 w-full items-center text-center min-h-10">
        <li className="col-start-1">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-gray-600 font-bold "
                : "hover:text-blue-600 transition-colors"
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="col-start-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-gray-600 font-bold "
                : "hover:text-blue-600 transition-colors"
            }
            to="/shop"
          >
            Shop
          </NavLink>
        </li>
        {user && user.role === "seller" && (
          <li className="col-start-3">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-gray-600 font-bold "
                  : "hover:text-blue-600 transition-colors"
              }
              to="/add-product"
            >
              Add Product
            </NavLink>
          </li>
        )}
        <li className="col-start-7">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-600 font-bold "
                    : "hover:text-blue-600 transition-colors"
                }
                to="/shopping-cart"
              >
                Shopping Cart
              </NavLink>
            </li>
        {user ? (
          <>
            
            <li className="col-start-8">
              Witaj,{" "}
              <span className="font-semibold">
                {user.name}, {user.role}
              </span>
            </li>
            <li className="col-start-9">
              <span
                className="cursor-pointer hover:text-blue-600 transition-colors"
                onClick={logout}
              >
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li className="col-start-8">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-600 font-bold "
                    : "hover:text-blue-600 transition-colors"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="col-start-9">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-600 font-bold "
                    : "hover:text-blue-600 transition-colors"
                }
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
