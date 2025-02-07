import React from 'react';
import Profile from './Profile';
import HomePage from './HomePage';
import Settings from './Settings'; // Assuming you have a Settings component

interface MainContentProps {
  selectedMenuItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedMenuItem }) => {
  switch (selectedMenuItem) {
    case 'home':
      return <HomePage />;
    case 'profile':
      return <Profile />;
    case 'settings':
      return <Settings />;
    default:
      return <HomePage />;
  }
};

export default MainContent;