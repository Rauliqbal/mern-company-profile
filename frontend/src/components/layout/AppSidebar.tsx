import { Box, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import * as LucideIcons from "lucide-react";

export default function AppSidebar() {
  const navigate = useNavigate();
  // const { setIsAuthenticated } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(true);

  // Menu List
  const sidebarMenu = [
    {
      title: "GENERAL",
      items: [
        { label: "Overview", path: "/dashboard", icon: "Box" },
        { label: "Services", path: "/dashboard/service", icon: "Wrench" },
        { label: "Product", path: "/dashboard/product", icon: "Package" },
      ],
    },
    {
      title: "OTHER",
      items: [
        { label: "Users", path: "/dashboard/users", icon: "User" },
        { label: "Settings", path: "/dashboard/settings", icon: "Settings" },
      ],
    },
  ];

  function logout() {
    navigate("/login", { replace: true });
  }
  return (
    <>
      <div className=" absolute left-8 top-[60px]  md:left-16 z-10 lg:hidden">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-3 rounded-full  ring-1 ring-gray-300 dark:ring-gray-700  hover:bg-gray-100 hover:dark:bg-slate-700"
        >
          <Box size="24" />
        </button>
      </div>
      <div
        className={`h-screen w-80 overflow-y-hidden absolute left-0 top-0 z-20 transition-all duration-300 lg:static  bg-white dark:bg-slate-800  ${
          expanded
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
              <h6 className="font-semibold dark:text-white mb-2">
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
                          ? "flex items-center py-3 px-4 gap-3 rounded-full dark:hover:text-black dark:text-black bg-[#FFd88d] hover:bg-[#FFD88D]  ring-0 ring-[#e2e8f0] dark:ring-slate-700 transition duration-300"
                          : "flex items-center py-3 px-4 gap-3 rounded-full dark:text-white dark:hover:text-black hover:bg-[#FFD88D] hover:ring-0 ring-1 ring-[#e2e8f0] dark:ring-slate-700 transition duration-300"
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
                onClick={logout}
                className="flex items-center py-3 px-4 gap-3 rounded-full dark:hover:text-black hover:bg-[#FFD88D] hover:ring-0 ring-1 ring-[#e2e8f0]  dark:ring-slate-700 transition duration-300"
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
