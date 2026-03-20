import React from "react";
import { Outlet } from "react-router";
import AppHeader from "../components/layout/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="relative w-full">
          <AppHeader />
        <div className="mt-16 container"> 
            <Outlet />
          </div>
      </main>

      <div className="flex h-screen overflow-hidden">


        {/* <main className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="container relative h-full px-4 pt-10 md:py-10">
            <SidebarTrigger />
            <AppHeader />

            <div className="mt-28">
              <Outlet />
            </div>
          </div>
        </main> */}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
