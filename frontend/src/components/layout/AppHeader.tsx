import { useUserStore } from "../../stores/user";
import ThemeToggle from "../ThemeToggle";
import { SidebarTrigger } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth";
   
export default function AppHeader() {
   const { user } = useUserStore()
   const {logout} = useAuthStore()

   function handleLogout(){
      logout()
   }
   return (
      <div className="px-4 absolute inset-x-0 top-0 py-2 bg-sidebar border-b">
         <div className="container flex items-center justify-end gap-4 lg:justify-between">
            <SidebarTrigger />
            <div className="inline-flex items-center gap-2 sm:gap-5">
               <ThemeToggle />
               <div className="h-12 bg-gray-300 dark:bg-gray-700 w-[1px]"></div>


               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex flex-col text-right">
                           <p className="text-sm text-gray-400">Hello</p>
                           <h6 className="text-sm font-bold">{user?.name}</h6>
                        </div>
                        <img
                           className="w-12 rounded-full"
                           src="https://github.com/shadcn.png"
                           alt={`photo ${user?.name}`}
                        />
                     </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52" align="end">
                     <DropdownMenuGroup>
                        <DropdownMenuLabel>
                           <h5 className="text-sm">{user?.name}</h5>
                           <p className="text-xs    text-gray-400">{user?.email}</p>
                        </DropdownMenuLabel>
                     </DropdownMenuGroup>
                     <DropdownMenuGroup>
                        {/* <DropdownMenuLabel></DropdownMenuLabel> */}
                        <DropdownMenuItem>
                           Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           Settings
                        </DropdownMenuItem>
                     </DropdownMenuGroup>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                        Log out
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </div>
   );
}