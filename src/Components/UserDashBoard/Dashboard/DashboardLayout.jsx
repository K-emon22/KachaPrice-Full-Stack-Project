
import {Outlet} from "react-router";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {
 

  return (
    <div className="relative flex min-h-screen ">
      <Dashboard />
      <main className="flex-1 z-0   bg-white min-h-screen mt-[53px] lg:mt-0 ">
     <div className="fixed top-0 left-0 h-[70px] w-full bg-green-600/30 border-black border-b border-l hidden lg:block animated-sea-green "></div>

        <div className=""><Outlet /></div>
      </main>
    </div>
  );
};

export default DashboardLayout;
