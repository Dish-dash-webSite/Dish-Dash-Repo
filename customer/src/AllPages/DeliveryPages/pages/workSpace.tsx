import React, { useState } from "react";
import LiveMap from "../component/map";
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { LoadScript } from "@react-google-maps/api";

const WorkSpace: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleMenuItemClick = (menuItem: string): void => {
    console.log(`Selected menu item: ${menuItem}`);
  };

  const handleMapLoaded = (): void => {
    console.log("Map loaded successfully!");
    setIsLoading(false); // Stop the loading state when map is loaded
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingTop: isLoading ? "0" : "80px",
      }}
    >
      {!isLoading && (
        <>
          <Navbar toggleSidebar={toggleSidebar} />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)}
            onMenuItemClick={handleMenuItemClick}
          />
        </>
      )}
      <LoadScript googleMapsApiKey="AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc">
        <LiveMap onMapLoaded={handleMapLoaded} />
      </LoadScript>
    </div>
  );
};

export default WorkSpace;
