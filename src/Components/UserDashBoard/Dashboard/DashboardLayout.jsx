
import {Outlet} from "react-router";
import Dashboard from "./Dashboard";

const DashboardLayout = () => {
 

  return (
    <div className="relative flex min-h-screen">
      <Dashboard />
      <main className="flex-1 z-0 p-6 bg-white min-h-screen mt-[53px]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
