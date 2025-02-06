import React from 'react';

const WorkSpace: React.FC = () => {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(`Your current location is:\nLatitude: ${latitude}\nLongitude: ${longitude}`);
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };


  return (
    <div>
      <div>workSpace</div>
      <button onClick={handleGetLocation}>Get My Location</button>
    </div>
  );
};

export default WorkSpace;