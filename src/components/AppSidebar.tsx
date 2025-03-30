
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  AlertTriangle, 
  Settings, 
  BarChart3, 
  PencilRuler, 
  History, 
  PieChart,
  LayoutDashboard,
  ClipboardCheck,
  Building,
  FileWarning,
  ChartBar
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AppSidebar() {
  const location = useLocation();
  const [userRole, setUserRole] = useState<'user' | 'company' | 'admin'>('user');
  
  // Menu items for regular users
  const userMenuItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Compare Fares",
      url: "/compare",
      icon: LineChart,
    },
    {
      title: "Report Issues",
      url: "/report",
      icon: AlertTriangle,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  // Menu items for company users
  const companyMenuItems = [
    {
      title: "Dashboard",
      url: "/company/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Fares",
      url: "/company/manage-fares",
      icon: PencilRuler,
    },
    {
      title: "Price History",
      url: "/company/price-history",
      icon: History,
    },
    {
      title: "Analytics",
      url: "/company/analytics",
      icon: BarChart3,
    },
  ];

  // Menu items for admin users
  const adminMenuItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Fares",
      url: "/admin/manage-fares",
      icon: ClipboardCheck,
    },
    {
      title: "Company Management",
      url: "/admin/company-management",
      icon: Building,
    },
    {
      title: "User Reports",
      url: "/admin/user-reports",
      icon: FileWarning,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: ChartBar,
    },
  ];

  const menuItems = 
    userRole === 'company' ? companyMenuItems : 
    userRole === 'admin' ? adminMenuItems : 
    userMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="font-bold text-sm">GF</span>
          </div>
          <div className="font-bold text-lg">Go Fare</div>
        </div>
        <div className="mt-4">
          <Select
            value={userRole}
            onValueChange={(value: 'user' | 'company' | 'admin') => setUserRole(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User View</SelectItem>
              <SelectItem value="company">Company View</SelectItem>
              <SelectItem value="admin">Admin View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {userRole === 'company' ? 'Company Portal' : 
             userRole === 'admin' ? 'Admin Portal' : 
             'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          Go Fare v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
