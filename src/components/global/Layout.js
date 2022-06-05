import React from "react";
import Header from "./Header";
import MobileSiderbar from "./MobileSiderbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-full">
      <MobileSiderbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* Static sidebar for desktop */}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-64 flex flex-col flex-1">
      <Header setSidebarOpen={setSidebarOpen}/>

      {children}

      </div>
    </div>
  );
}
