import React, { useEffect, useState } from "react";
import {
  Heart,
  Users,
  TrendingUp,
  MapPin,
  Activity,
  Shield,

  Calendar,
  FileText,
  Bell,
  User,

  Menu,
  X,
  Search,
} from "lucide-react";

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // High-quality healthcare and migrant worker images
  const healthImages = [
    "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1584467735871-8db9ac8e5e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
    "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
  ];

  const stats = [
    {
      icon: Users,
      label: "Registered Migrants",
      value: "45,231",
      change: "+12%",
      color: "text-blue-600",
      bgColor: "from-blue-500 to-blue-600",
    },
    {
      icon: Heart,
      label: "Health Checkups",
      value: "23,456",
      change: "+8%",
      color: "text-red-600",
      bgColor: "from-red-500 to-red-600",
    },
    {
      icon: Activity,
      label: "Active Cases",
      value: "1,234",
      change: "-5%",
      color: "text-green-600",
      bgColor: "from-green-500 to-green-600",
    },
    {
      icon: Shield,
      label: "Vaccinated",
      value: "38,901",
      change: "+15%",
      color: "text-purple-600",
      bgColor: "from-purple-500 to-purple-600",
    },
  ];

  const navItems = [
    { name: "Health Records", icon: FileText },
    { name: "Analytics", icon: TrendingUp },
    { name: "Notifications", icon: Bell },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % healthImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % healthImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + healthImages.length) % healthImages.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  ArogyaSaathi
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      //@ts-ignore
                      item.active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm w-32"
                />
              </div>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    Admin
                  </span>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-blue-50"
                onClick={() => setIsNavOpen(!isNavOpen)}
              >
                {isNavOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isNavOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={index}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg transition-all duration-200 ${
                      //@ts-ignore
                      item.active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {healthImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <img
                src={image}
                alt={`Healthcare ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/50" />
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {healthImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Hero Content - Aligned Left */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-200 text-sm font-medium">
                  Live System Monitoring
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                ArogyaSaathi
                <span className="block text-3xl md:text-4xl text-green-200 mt-3 font-light">
                  Management Portal
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
                Comprehensive healthcare monitoring and management system for
                migrant workers across Kerala. Ensuring accessible, quality
                healthcare for all through innovative technology solutions.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Access Dashboard
                </button>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/30">
                  Learn More
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                  <div className="flex items-center space-x-3 text-white">
                    <MapPin className="w-5 h-5 text-green-300" />
                    <div>
                      <div className="font-semibold">14 Districts Covered</div>
                      <div className="text-green-200 text-sm">
                        State-wide Network
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                  <div className="flex items-center space-x-3 text-white">
                    <Heart className="w-5 h-5 text-red-300" />
                    <div>
                      <div className="font-semibold">24/7 Health Support</div>
                      <div className="text-green-200 text-sm">
                        Emergency Services
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 md:-mt-10 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:transform hover:scale-105 border border-gray-100"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.bgColor} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                  {stat.value}
                </h3>
                <p className="text-gray-600 mb-2 text-center font-medium">
                  {stat.label}
                </p>
                <div className="text-center">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${
                      stat.change.startsWith("+")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stat.change} this month
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Comprehensive Health Management System
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Advanced healthcare solutions designed specifically for migrant
            worker communities across Kerala
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Health Monitoring",
              description:
                "Advanced tracking of health metrics and medical conditions across all registered migrants with live alerts and notifications",
              icon: Activity,
              color: "from-green-400 to-green-600",
            },
            {
              title: "District-wise Analytics",
              description:
                "Comprehensive analytics and detailed reporting for each of Kerala's 14 districts with interactive dashboards",
              icon: TrendingUp,
              color: "from-blue-400 to-blue-600",
            },
            {
              title: "Emergency Response",
              description:
                "Rapid response system for health emergencies and critical situations with 24/7 support teams",
              icon: Shield,
              color: "from-red-400 to-red-600",
            },
            {
              title: "Medical Records",
              description:
                "Secure digital health records with easy access for authorized healthcare providers across facilities",
              icon: FileText,
              color: "from-purple-400 to-purple-600",
            },
            {
              title: "Appointment System",
              description:
                "Streamlined appointment scheduling and management for healthcare services and follow-ups",
              icon: Calendar,
              color: "from-orange-400 to-orange-600",
            },
            {
              title: "Multi-language Support",
              description:
                "Available in multiple languages to serve diverse migrant communities effectively",
              icon: Users,
              color: "from-indigo-400 to-indigo-600",
            },
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-blue-200"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
