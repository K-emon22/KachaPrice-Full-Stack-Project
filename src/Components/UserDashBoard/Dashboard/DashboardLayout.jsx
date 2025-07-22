
import {Outlet} from "react-router";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {
 

  return (
    <div className="relative flex min-h-screen ">
      <Dashboard />
      <main className="flex-1 z-0   bg-white min-h-screen mt-[53px] lg:mt-0 ">
        <div className="h-[70px] bg-green-600/30 border-black border-b border-l sticky top-0 z-50 hidden lg:block animated-sea-green"></div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
