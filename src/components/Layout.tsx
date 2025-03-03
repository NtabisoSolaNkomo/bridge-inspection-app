
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  Camera, 
  History, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'New Inspection', path: '/new-inspection', icon: Camera },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'History', path: '/history', icon: History },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "w-64 h-screen bg-card shadow-md z-40 flex-shrink-0 transition-all duration-300 ease-in-out",
          isMobile && "fixed inset-y-0 left-0",
          isMobile && !sidebarOpen && "-translate-x-full"
        )}
      >
        {/* App Logo */}
        <div className="flex items-center justify-center h-16 border-b">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">BS</span>
            </div>
            <span className="text-lg font-semibold">Bridge Scan Pro</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                "hover:bg-secondary",
                location.pathname === item.path 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground"
              )}
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto h-screen">
        <main className="container py-6 max-w-6xl animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
