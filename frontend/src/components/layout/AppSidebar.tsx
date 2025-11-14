import { Box, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import * as LucideIcons from "lucide-react";
import { useAuthStore } from "../../stores/auth";

export default function AppSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuthStore()
  const [expanded, setExpanded] = useState(true);

  // Menu List
  const sidebarMenu = [
    {
      title: "Main Menu",
      items: [
        { label: "Overview", path: "/dashboard", icon: "Box" },
        { label: "Services", path: "/dashboard/service", icon: "Wrench" },
        { label: "Product", path: "/dashboard/product", icon: "Package" },
      ],
    },
    {
      title: "Other",
      items: [
        { label: "Users", path: "/dashboard/users", icon: "User" },
        { label: "Settings", path: "/dashboard/settings", icon: "Settings" },
      ],
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  }
  return (
    <>
      {/* Button Toggle */}
      <div className=" absolute left-4 top-[20px]  md:left-16 z-10 lg:hidden">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-3 rounded-full  ring-1 ring-gray-300 dark:ring-gray-700  hover:bg-gray-100 hover:dark:bg-slate-700"
        >
          <Box size="24" />
        </button>
      </div>
      {/* Sidebar Menu */}
      <div
        className={`h-screen w-80 overflow-y-hidden absolute left-0 top-0 z-20 transition-all duration-300 lg:static  bg-white dark:bg-background border-r border-gray-200 dark:border-gray-700 ${expanded
          ? "-translate-x-full lg:translate-x-0 "
          : "lg:-translate-x-full translate-x-0 shadow-xl"
          }`}
      >
        <div className="flex flex-col ">
          <div className="flex items-center lg:justify-center px-4 pt-8">
            <h1 className="text-primary dark:text-white font-bold text-3xl">
              MERN Company
            </h1>

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg ring-1 ring-gray-300 dark:ring-gray-700 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 hover:dark:bg-slate-700 ml-4 lg:hidden"
            >
              {expanded ? (
                <ChevronRight
                  size="24"
                  className="stroke-[#0A051E] dark:stroke-[#DBD8E9]"
                />
              ) : (
                <ChevronLeft
                  size="24"
                  className="stroke-[#0A051E] dark:stroke-[#DBD8E9]"
                />
              )}
            </button>
          </div>

          {sidebarMenu.map((section) => (
            <div key={section.title} className="mt-8 px-8">
              <h6 className="font-semibold text-black/50 dark:text-white mb-2 transition duration-300">
                {section.title}
              </h6>

              <div className="flex flex-col gap-4">
                {section.items.map((item) => {
                  const IconComponent =
                    (LucideIcons[
                      item.icon as keyof typeof LucideIcons
                    ] as React.ElementType) || LucideIcons.Circle;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/dashboard"}
                      className={({ isActive }) =>
                        isActive
                          ? "after:absolute after:content-[''] after:w-1.5 after:h-7 after:rounded-l-lg after:bg-primary after:right-0 relative flex items-center py-3 px-4 gap-3 rounded-xl text-primary dark:text-white bg-primary/20 dark:bg-primary/40 hover:bg-primary/40 ring-0 ring-gray-200 dark:ring-slate-700 transition duration-300"
                          : "flex items-center py-3 px-4 gap-3 rounded-xl dark:text-white dark:hover:text-white hover:bg-primary/20 hover:ring-0 ring-1 ring-gray-200 dark:ring-slate-700 transition duration-300"
                      }
                    >
                      <IconComponent size={20} />
                      <p className="font-semibold">{item.label}</p>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-8 px-8">
            <h6 className="font-semibold  mb-2"></h6>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center py-3 px-4 gap-3 rounded-full dark:hover:text-black hover:bg-primary-hover hover:ring-0 ring-1 ring-gray-200  dark:ring-slate-700 transition duration-300"
              >
                <Box size="24" />

                <p className="font-semibold ">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
