
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // We'll consider the user logged in if there's a selectedRole in sessionStorage
  const isLoggedIn = !!sessionStorage.getItem('selectedRole');
  const userRole = sessionStorage.getItem('selectedRole') as 'user' | 'company' | 'admin' | null;
  
  const handleLogout = () => {
    // Clear the selected role from sessionStorage
    sessionStorage.removeItem('selectedRole');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to view selection page after logout
    navigate('/view-selection');
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    switch (userRole) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard' },
          { name: 'Manage Fares', path: '/admin/manage-fares' },
          { name: 'Companies', path: '/admin/company-management' },
          { name: 'User Reports', path: '/admin/user-reports' },
          { name: 'Analytics', path: '/admin/analytics' }
        ];
      case 'company':
        return [
          { name: 'Dashboard', path: '/company/dashboard' },
          { name: 'Manage Fares', path: '/company/manage-fares' },
          { name: 'Price History', path: '/company/price-history' },
          { name: 'Analytics', path: '/company/analytics' }
        ];
      default: // User role
        return [
          { name: 'Home', path: '/' },
          { name: 'Compare', path: '/compare' },
          { name: 'Report', path: '/report' },
          { name: 'Settings', path: '/settings' }
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="w-full z-40 bg-white dark:bg-gray-900">
      <div className="flex justify-between">
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="sm:ml-6 sm:flex sm:items-center">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent"></span>
              </Button>
              <div className="ml-3 relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to={userRole === 'admin' ? '/admin/dashboard' : 
                               userRole === 'company' ? '/company/dashboard' : 
                               '/settings'} className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={userRole === 'admin' ? '/admin/dashboard' : 
                               userRole === 'company' ? '/company/dashboard' : 
                               '/settings'} className="w-full">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Saved Routes</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="default" onClick={() => navigate('/register')}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center sm:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {!isLoggedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 px-4 py-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/register');
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
          
          {isLoggedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full bg-gray-200 p-2" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">User Name</div>
                  <div className="text-sm font-medium text-gray-500">user@example.com</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  to={userRole === 'admin' ? '/admin/dashboard' : 
                      userRole === 'company' ? '/company/dashboard' : 
                      '/settings'}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to={userRole === 'admin' ? '/admin/dashboard' : 
                      userRole === 'company' ? '/company/dashboard' : 
                      '/settings'}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
