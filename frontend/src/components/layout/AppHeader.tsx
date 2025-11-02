import { useUserStore } from "../../stores/user";
import ThemeToggle from "../ThemeToggle";

export default function AppHeader() {
   const { user } = useUserStore()
   return (
      <div className="sticky p-5 lg:absolute inset-x-4 top-4 bg-white dark:bg-slate-800 rounded-3xl">
         <div className="flex items-center justify-end gap-4 lg:justify-between">
            <div className="relative hidden lg:block">
               <input
                  placeholder="Search..."
                  className="w-64 px-5 py-3 transition-all bg-transparent rounded-full outline-none input ring-1 ring-gray-300 dark:ring-gray-700 focus:w-72"
                  name="search"
                  type="search"
               />
               <svg
                  className="absolute text-gray-400 size-6 top-3 right-3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                     strokeLinejoin="round"
                     strokeLinecap="round"
                  ></path>
               </svg>
            </div>

            <div className="inline-flex items-center gap-2 sm:gap-5">
               <ThemeToggle />
               <div className="h-12 bg-gray-300 dark:bg-gray-700 w-[1px]"></div>
               <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex flex-col text-right">
                     <p className="text-sm text-gray-400">Hello</p>
                     <h6 className="text-sm font-bold">{user?.name}</h6>
                  </div>
                  <img
                     className="w-12"
                     src="https://avatar.iran.liara.run/public/boy"
                     alt={`photo ${user?.name}`}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}