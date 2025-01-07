import React from "react";
import { Sidebar } from "./Sidebar";

export const HomeLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:ml-16 lg:ml-20 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;
