import React, { useState } from "react";
import { MapPin, AlertTriangle, Users, Activity, Phone } from "lucide-react";

const KeralaMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = [
    {
      name: "Kasaragod",
      migrants: 2800,
      riskLevel: "low",
      x: 20,
      y: 15,
      cases: 12,
    },
    {
      name: "Kannur",
      migrants: 3900,
      riskLevel: "medium",
      x: 25,
      y: 25,
      cases: 23,
    },
    {
      name: "Wayanad",
      migrants: 1200,
      riskLevel: "low",
      x: 35,
      y: 30,
      cases: 8,
    },
    {
      name: "Kozhikode",
      migrants: 6800,
      riskLevel: "high",
      x: 15,
      y: 40,
      cases: 45,
    },
    {
      name: "Malappuram",
      migrants: 4500,
      riskLevel: "medium",
      x: 25,
      y: 50,
      cases: 28,
    },
    {
      name: "Palakkad",
      migrants: 3200,
      riskLevel: "low",
      x: 40,
      y: 55,
      cases: 15,
    },
    {
      name: "Thrissur",
      migrants: 4200,
      riskLevel: "medium",
      x: 30,
      y: 65,
      cases: 22,
    },
    {
      name: "Ernakulam",
      migrants: 12000,
      riskLevel: "high",
      x: 35,
      y: 75,
      cases: 67,
    },
    {
      name: "Idukki",
      migrants: 1800,
      riskLevel: "low",
      x: 50,
      y: 70,
      cases: 9,
    },
    {
      name: "Kottayam",
      migrants: 2100,
      riskLevel: "low",
      x: 40,
      y: 82,
      cases: 11,
    },
    {
      name: "Alappuzha",
      migrants: 2800,
      riskLevel: "medium",
      x: 25,
      y: 85,
      cases: 18,
    },
    {
      name: "Pathanamthitta",
      migrants: 1500,
      riskLevel: "low",
      x: 45,
      y: 88,
      cases: 7,
    },
    {
      name: "Kollam",
      migrants: 3600,
      riskLevel: "medium",
      x: 30,
      y: 92,
      cases: 24,
    },
    {
      name: "Thiruvananthapuram",
      migrants: 8500,
      riskLevel: "high",
      x: 25,
      y: 98,
      cases: 52,
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-green-600 bg-green-100";
    }
  };

  const getMarkerColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="p-8 md:mt-0 mt-10 h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kerala District Map
          </h1>
          <p className="text-gray-600">
            Interactive map showing migrant health status across all Kerala
            districts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Kerala State Overview
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>High Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low Risk</span>
                  </div>
                </div>
              </div>

              {/* Simplified Kerala Map */}
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden border-2 border-blue-200">
                {/* Map outline (simplified Kerala shape) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 120"
                >
                  <path
                    d="M20 10 L60 15 L65 25 L55 35 L50 45 L45 55 L50 65 L55 75 L50 85 L45 95 L35 105 L25 110 L15 105 L10 95 L15 85 L20 75 L15 65 L20 55 L25 45 L20 35 L25 25 L20 15 Z"
                    className="fill-blue-50 stroke-blue-300 stroke-2"
                  />
                </svg>

                {/* District markers */}
                {districts.map((district) => (
                  <div
                    key={district.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${district.x}%`, top: `${district.y}%` }}
                    onClick={() => setSelectedDistrict(district.name)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${getMarkerColor(
                        district.riskLevel
                      )} shadow-lg group-hover:scale-125 transition-transform duration-200`}
                    >
                      <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-25"></div>
                    </div>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      {district.name}
                      <br />
                      {district.migrants} migrants
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-900">
                  Emergency Contacts
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">
                    Health Emergency
                  </h4>
                  <p className="text-lg font-bold text-red-600">1075</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">Ambulance</h4>
                  <p className="text-lg font-bold text-red-600">108</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">Control Room</h4>
                  <p className="text-lg font-bold text-red-600">
                    +91-471-2552056
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* District Details Sidebar */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                State Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Districts</span>
                  <span className="font-semibold text-gray-900">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Migrants</span>
                  <span className="font-semibold text-gray-900">
                    {districts
                      .reduce((sum, d) => sum + d.migrants, 0)
                      .toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Cases</span>
                  <span className="font-semibold text-gray-900">
                    {districts.reduce((sum, d) => sum + d.cases, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">High Risk Areas</span>
                  <span className="font-semibold text-red-600">
                    {districts.filter((d) => d.riskLevel === "high").length}
                  </span>
                </div>
              </div>
            </div>

            {/* District List */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Districts by Risk Level
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {districts
                  .sort((a, b) => {
                    const riskOrder = { high: 3, medium: 2, low: 1 };
                    return (
                      riskOrder[b.riskLevel as keyof typeof riskOrder] -
                      riskOrder[a.riskLevel as keyof typeof riskOrder]
                    );
                  })
                  .map((district) => (
                    <div
                      key={district.name}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedDistrict === district.name
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => setSelectedDistrict(district.name)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {district.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                            district.riskLevel
                          )}`}
                        >
                          {district.riskLevel.charAt(0).toUpperCase() +
                            district.riskLevel.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{district.migrants.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Activity className="w-4 h-4" />
                          <span>{district.cases} cases</span>
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Selected District Details */}
            {selectedDistrict && (
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                {(() => {
                  const district = districts.find(
                    (d) => d.name === selectedDistrict
                  );
                  return district ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {district.name} Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            Registered Migrants
                          </span>
                          <span className="font-semibold text-gray-900">
                            {district.migrants.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            Active Health Cases
                          </span>
                          <span className="font-semibold text-gray-900">
                            {district.cases}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Risk Level</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                              district.riskLevel
                            )}`}
                          >
                            {district.riskLevel.charAt(0).toUpperCase() +
                              district.riskLevel.slice(1)}
                          </span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            View Detailed Report
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeralaMap;
