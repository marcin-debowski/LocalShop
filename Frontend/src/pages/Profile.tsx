import { Outlet } from "react-router";
import Sidebar from "../components/layout/Sidebar";

function Profile() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[20rem] flex z-40">
        <Sidebar />
      </div>
      {/* Main content */}
      <div className="ml-[20rem] w-[calc(100vw-20rem)] pt-20 flex-1 h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center justify-start">
            <Outlet />
      </div>
    </div>
  );
}
export default Profile;