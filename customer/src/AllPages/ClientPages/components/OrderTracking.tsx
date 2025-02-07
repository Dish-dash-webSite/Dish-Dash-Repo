import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useJsApiLoader } from '@react-google-maps/api';

interface DriverLocation {
  lat: number;
  lng: number;
  driverId: string;
  orderId: string;
}

const OrderTracking: React.FC<{ orderId: string }> = ({ orderId }) => {
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc"
  });

  useEffect(() => {
    // Connect to socket server
    const socket = io('http://localhost:3000'); // Update with your socket server URL

    // Join order tracking room
    socket.emit('join-order-tracking', orderId);

    // Listen for driver location updates
    socket.on('driver-location-update', (location: DriverLocation) => {
      if (location.orderId === orderId) {
        setDriverLocation(location);
        updateMap(location);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId]);

  const updateMap = (location: DriverLocation) => {
    if (isLoaded && location) {
      const map = new window.google.maps.Map(document.getElementById('tracking-map')!, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
      });

      // Add/update driver marker
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        icon: {
          url: '/driver-icon.png', // Add your custom driver icon
          scaledSize: new window.google.maps.Size(40, 40),
        },
        title: "Your Driver"
      });
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Track Your Order</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div id="tracking-map" style={{ height: '400px', width: '100%' }} />
        {driverLocation && (
          <div className="mt-4">
            <p className="text-gray-600">
              Driver is {calculateDistance(driverLocation)} away
            </p>
            <p className="text-gray-600">
              Estimated arrival: {calculateETA(driverLocation)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
const calculateDistance = (location: DriverLocation) => {
  // Implement distance calculation
  return "2.5 km";
};

const calculateETA = (location: DriverLocation) => {
  // Implement ETA calculation
  return "15 minutes";
};

export default OrderTracking; 