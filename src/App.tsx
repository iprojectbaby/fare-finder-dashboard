
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

// User pages
import Index from "./pages/Index";
import Compare from "./pages/Compare";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Company pages
import CompanyDashboard from "./pages/company/Dashboard";
import ManageFares from "./pages/company/ManageFares";
import PriceHistory from "./pages/company/PriceHistory";
import CompanyAnalytics from "./pages/company/Analytics";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminManageFares from "./pages/admin/ManageFares";
import CompanyManagement from "./pages/admin/CompanyManagement";
import UserReports from "./pages/admin/UserReports";
import AdminAnalytics from "./pages/admin/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <SidebarTrigger className="mr-2" />
                    <h1 className="text-2xl font-bold">Go Fare</h1>
                  </div>
                </div>
                <Routes>
                  {/* User Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* Company Routes */}
                  <Route path="/company/dashboard" element={<CompanyDashboard />} />
                  <Route path="/company/manage-fares" element={<ManageFares />} />
                  <Route path="/company/price-history" element={<PriceHistory />} />
                  <Route path="/company/analytics" element={<CompanyAnalytics />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/manage-fares" element={<AdminManageFares />} />
                  <Route path="/admin/company-management" element={<CompanyManagement />} />
                  <Route path="/admin/user-reports" element={<UserReports />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
