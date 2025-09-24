import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Users,
  Heart,
  MapPin,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const migrants = [
    {
      id: "001",
      name: "Rajesh Kumar",
      age: 28,
      district: "Thiruvananthapuram",
      occupation: "Construction Worker",
      healthStatus: "Good",
      lastCheckup: "2024-01-15",
      phone: "+91 9876543210",
      emergencyContact: "+91 9876543211",
    },
    {
      id: "002",
      name: "Amit Singh",
      age: 32,
      district: "Kochi",
      occupation: "Factory Worker",
      healthStatus: "Under Observation",
      lastCheckup: "2024-01-10",
      phone: "+91 9876543212",
      emergencyContact: "+91 9876543213",
    },
    {
      id: "003",
      name: "Suresh Reddy",
      age: 25,
      district: "Kozhikode",
      occupation: "Hotel Staff",
      healthStatus: "Good",
      lastCheckup: "2024-01-20",
      phone: "+91 9876543214",
      emergencyContact: "+91 9876543215",
    },
    {
      id: "004",
      name: "Prakash Jha",
      age: 35,
      district: "Thrissur",
      occupation: "Driver",
      healthStatus: "Critical",
      lastCheckup: "2024-01-12",
      phone: "+91 9876543216",
      emergencyContact: "+91 9876543217",
    },
    {
      id: "005",
      name: "Dinesh Yadav",
      age: 29,
      district: "Kannur",
      occupation: "Agriculture Worker",
      healthStatus: "Good",
      lastCheckup: "2024-01-18",
      phone: "+91 9876543218",
      emergencyContact: "+91 9876543219",
    },
  ];

  const getHealthStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "under observation":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "good":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredMigrants = migrants.filter(
    (migrant) =>
      migrant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      migrant.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      migrant.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Migrant Registry
              </h1>
              <p className="text-gray-600">
                Comprehensive database of registered migrant workers
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Register New Migrant</span>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl p-4 shadow-lg flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, district, or occupation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filter</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Registered",
              value: migrants.length.toString(),
              icon: Users,
              color: "bg-blue-500",
            },
            {
              title: "Good Health",
              value: migrants
                .filter((m) => m.healthStatus === "Good")
                .length.toString(),
              icon: Heart,
              color: "bg-green-500",
            },
            {
              title: "Under Observation",
              value: migrants
                .filter((m) => m.healthStatus === "Under Observation")
                .length.toString(),
              icon: Calendar,
              color: "bg-orange-500",
            },
            {
              title: "Critical Cases",
              value: migrants
                .filter((m) => m.healthStatus === "Critical")
                .length.toString(),
              icon: MapPin,
              color: "bg-red-500",
            },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Migrants Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Registered Migrants ({filteredMigrants.length} of{" "}
              {migrants.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Name & Contact
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Location & Work
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Health Status
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Last Checkup
                  </th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMigrants.map((migrant, index) => (
                  <tr
                    key={migrant.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        #{migrant.id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {migrant.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Age: {migrant.age}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {migrant.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">
                            {migrant.district}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {migrant.occupation}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getHealthStatusColor(
                          migrant.healthStatus
                        )}`}
                      >
                        {migrant.healthStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {migrant.lastCheckup}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors duration-200">
                          View
                        </button>
                        <button className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-green-200 transition-colors duration-200">
                          Contact
                        </button>
                        {migrant.healthStatus === "Critical" && (
                          <button className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-200 transition-colors duration-200">
                            Alert
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Registration
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Register new migrant workers quickly with essential details
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Start Registration
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Health Checkup
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Schedule and manage health checkups for registered migrants
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
              Schedule Checkup
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Bulk Communication
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Send health alerts and updates to multiple migrants
            </p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200">
              Send Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
