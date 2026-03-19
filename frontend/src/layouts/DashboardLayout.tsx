import React from "react";
import { Outlet } from "react-router";
import AppHeader from "../components/layout/AppHeader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MainSidebar } from "@/components/layout/MainSidebar";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <MainSidebar />

      <main className="w-full">
        <div className=" relative h-full px-4 pt-10 md:py-10">
          <AppHeader />

          <div className="mt-28"> 
            <Outlet />
          </div>
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
