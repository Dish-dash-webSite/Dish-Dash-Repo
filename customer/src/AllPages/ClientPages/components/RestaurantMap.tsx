import React, { useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const center = { lat: 51.5074, lng: -0.1278 }; // London coordinates

const RestaurantMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc"
  });

  useEffect(() => {
    if (isLoaded) {
      const map = new window.google.maps.Map(document.getElementById('map')!, {
        center: center,
        zoom: 13,
      });

      // Add a marker for demonstration
      new window.google.maps.Marker({
        position: center,
        map: map,
        title: "London"
      });
    }
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <div id="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default RestaurantMap;
