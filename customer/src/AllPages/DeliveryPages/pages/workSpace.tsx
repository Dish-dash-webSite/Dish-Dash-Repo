import React, { useState } from 'react';
import WorkSpaceMap from "../component/map";
import Navbar from "../component/NavBar";
import Sidebar from "../component/Sidebar";

const WorkSpace: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (menuItem: string) => {
    console.log(`Selected menu item: ${menuItem}`);
  };

  const handleMapLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ 
        backgroundColor: '#ffffff', 
        minHeight: '100vh',
        paddingTop: isLoading ? '0' : '80px'
    }}>
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
      <WorkSpaceMap onMapLoaded={handleMapLoaded} />
    </div>
  );
};

export default WorkSpace;