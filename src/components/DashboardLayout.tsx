import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Footer } from "./Footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header />

        <main className="flex-1 p-3 sm:p-6 bg-background overflow-y-auto">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
