import {
  Box,
  Wrench,
  Package,
  Users,
  Settings,
  LayoutDashboard
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navlink = [
  {
    title: "GENERAL",
    items: [
      { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
      { label: "Services", path: "/dashboard/service", icon: Wrench },
      { label: "Product", path: "/dashboard/product", icon: Package },
    ],
  },
  {
    title: "OTHER",
    items: [
      { label: "Users", path: "/dashboard/users", icon: Users },
      { label: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {navlink.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <a href={item.path}>
                        {/* Render ikon di sini */}
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}