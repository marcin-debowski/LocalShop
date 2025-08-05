import { Outlet } from "react-router";
import Sidebar from "../components/layout/Sidebar";




function Profile() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="w-full md:w-[20rem] md:fixed md:top-16 md:left-0 h-auto md:h-[calc(100vh-4rem)] flex z-40 bg-white border-r border-gray-200"
      >
        <Sidebar />
      </div>
      {/* Main content */}
      <div
        className="flex-1 pt-20 h-auto overflow-y-auto ml-[20rem]"
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Profile;