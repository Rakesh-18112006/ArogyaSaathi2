import  { useState } from "react";
import Sidebar from "./Sidebar";
import HeroSection from "./HeroSection";
import Analytics from "./Analytics";
import KeralaMap from "./KeralaMap";
import Dashboard from "./Dashboard";

function Whole() {
  const [activeSection, setActiveSection] = useState("home");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "analytics":
        return <Analytics />;
      case "map":
        return <KeralaMap />;
      case "dashboard":
        return <Dashboard />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 overflow-hidden">{renderActiveSection()}</main>
    </div>
  );
}

export default Whole;
