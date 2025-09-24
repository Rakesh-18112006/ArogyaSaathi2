import React, { useState } from "react";
import {
  Home,
  BarChart3,
  MapPin,
  Users,
  Heart,
  FileText,
  Settings,
  Bell,
  Shield,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "home", icon: Home, label: "Dashboard Home", color: "text-blue-600" },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Health Analytics",
      color: "text-green-600",
    },
    {
      id: "map",
      icon: MapPin,
      label: "Kerala Map View",
      color: "text-red-600",
    },
    {
      id: "dashboard",
      icon: Users,
      label: "Migrant Registry",
      color: "text-purple-600",
    },
    {
      id: "health",
      icon: Heart,
      label: "Health Records",
      color: "text-pink-600",
    },
    {
      id: "reports",
      icon: FileText,
      label: "Reports",
      color: "text-orange-600",
    },
    {
      id: "alerts",
      icon: Bell,
      label: "Health Alerts",
      color: "text-yellow-600",
    },
    {
      id: "safety",
      icon: Shield,
      label: "Safety Protocols",
      color: "text-teal-600",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      color: "text-gray-600",
    },
  ];

  const handleMenuClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false); // close sidebar after selection
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <h1 className="text-lg font-bold text-gray-800">Kerala Health</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col z-40 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200 hidden lg:flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Kerala Health</h1>
            <p className="text-sm text-gray-500">Migrant Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-14 lg:mt-0">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left hover:bg-gray-50 ${
                  activeSection === item.id
                    ? "bg-blue-50 border-l-4 border-blue-600"
                    : ""
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 ${
                    activeSection === item.id ? "text-blue-600" : item.color
                  }`}
                />
                <span
                  className={`font-medium ${
                    activeSection === item.id
                      ? "text-blue-900"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 text-white">
            <h3 className="font-semibold text-sm">Emergency Hotline</h3>
            <p className="text-lg font-bold mt-1">1075</p>
            <p className="text-xs opacity-90">24/7 Health Support</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
