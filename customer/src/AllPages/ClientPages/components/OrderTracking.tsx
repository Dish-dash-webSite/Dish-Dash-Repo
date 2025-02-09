import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useJsApiLoader } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';

interface DriverLocation {
  lat: number;
  lng: number;
  driverId: string;
  orderId: string;
}

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Extract orderId from URL
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc" // Your API key
  });

  useEffect(() => {
    if (!isLoaded || !orderId) return;

    const socket = io('http://localhost:3000');
    socket.emit('join-order-tracking', orderId);

    socket.on('driver-location-update', (location: DriverLocation) => {
      if (location.orderId === orderId) {
        setDriverLocation({
          ...location,
          lat: 36.8663, // Ghazala, Ariana, Tunisia latitude
          lng: 10.1960  // Ghazala, Ariana, Tunisia longitude
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoaded, orderId]);

  useEffect(() => {
    if (isLoaded && driverLocation) {
      const mapElement = document.getElementById('tracking-map');
      if (!mapElement) return;

      const map = new window.google.maps.Map(mapElement, {
        center: { lat: driverLocation.lat, lng: driverLocation.lng },
        zoom: 15,
        styles: [
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          }
        ]
      });

      // Create a more visible marker for the driver
      new window.google.maps.Marker({
        position: { lat: driverLocation.lat, lng: driverLocation.lng },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#FF0000", // Bright red color
          fillOpacity: 1,
          strokeColor: "#FFFFFF", // White border
          strokeWeight: 2,
        },
        title: "Your Driver"
      });

      // Add a circle around the driver to make it more visible
      new window.google.maps.Circle({
        map: map,
        center: { lat: driverLocation.lat, lng: driverLocation.lng },
        radius: 50, // 50 meters radius
        fillColor: "#FF0000",
        fillOpacity: 0.2,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
      });
    }
  }, [isLoaded, driverLocation]);

  if (!isLoaded) return <div>Loading map...</div>;

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
  // Implement distance calculation logic here
  return "2.5 km";
};

const calculateETA = (location: DriverLocation) => {
  // Implement ETA calculation logic here
  return "15 minutes";
};

export default OrderTracking; 