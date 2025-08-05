import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
   
      <div
  className="relative flex h-full w-full flex-col rounded-xl bg-white bg-clip-border p-4 pt-16 text-gray-700 shadow-xl shadow-blue-gray-900/5 ml-0">
  <div className="p-4 mb-2">
    <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Sidebar
    </h5>
  </div>
  <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
    <NavLink
      to="/profile"
      end
      className={({ isActive }) =>
        `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${isActive ? 'font-bold text-stone-900 bg-gray-100' : ''}`
      }
    >
      Profile
    </NavLink>
    <NavLink
      to="/profile/orders"
      className={({ isActive }) =>
        `flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${isActive ? 'font-bold text-stone-900 bg-gray-100' : ''}`
      }
    >
      Orders
      
      
    </NavLink>
  </nav>
</div>

  );}
export default Sidebar;