import React from "react";
import {
  TrendingUp,
  Users,
  Heart,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";

const Analytics: React.FC = () => {
  const chartData = [
    { month: "Jan", checkups: 2400, cases: 120 },
    { month: "Feb", checkups: 2800, cases: 98 },
    { month: "Mar", checkups: 3200, cases: 156 },
    { month: "Apr", checkups: 2900, cases: 134 },
    { month: "May", checkups: 3500, cases: 98 },
    { month: "Jun", checkups: 4100, cases: 87 },
  ];

  const districtData = [
    { district: "Thiruvananthapuram", migrants: 8500, healthScore: 85 },
    { district: "Kochi", migrants: 12000, healthScore: 78 },
    { district: "Kozhikode", migrants: 6800, healthScore: 82 },
    { district: "Thrissur", migrants: 4200, healthScore: 88 },
    { district: "Kannur", migrants: 3900, healthScore: 81 },
  ];

  return (
    <div className="p-8 mt-10 md:mt-0 h-screen overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Health Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive health data analysis for migrant population management
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Health Checkups",
              value: "23,456",
              icon: Heart,
              color: "bg-red-500",
              trend: "+12%",
            },
            {
              title: "Active Health Cases",
              value: "1,234",
              icon: AlertCircle,
              color: "bg-orange-500",
              trend: "-8%",
            },
            {
              title: "Vaccination Rate",
              value: "86.2%",
              icon: Users,
              color: "bg-green-500",
              trend: "+5%",
            },
            {
              title: "Health Score Avg",
              value: "82.4",
              icon: TrendingUp,
              color: "bg-blue-500",
              trend: "+3%",
            },
          ].map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      metric.trend.startsWith("+")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {metric.trend}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </h3>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Health Checkups Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Health Checkups
              </h3>
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 w-8">
                    {item.month}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.checkups / 4500) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-12">
                        {item.checkups}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Cases Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Health Cases
              </h3>
              <AlertCircle className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 w-8">
                    {item.month}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(item.cases / 200) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-12">
                        {item.cases}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* District-wise Data */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              District-wise Health Overview
            </h3>
            <MapPin className="w-5 h-5 text-gray-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    District
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Migrants
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Health Score
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {districtData.map((district, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {district.district}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {district.migrants.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              district.healthScore >= 85
                                ? "bg-green-500"
                                : district.healthScore >= 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${district.healthScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {district.healthScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          district.healthScore >= 85
                            ? "bg-green-100 text-green-800"
                            : district.healthScore >= 80
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {district.healthScore >= 85
                          ? "Excellent"
                          : district.healthScore >= 80
                          ? "Good"
                          : "Needs Attention"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
