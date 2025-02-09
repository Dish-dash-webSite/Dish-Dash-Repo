
import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 36.8625, lng: 10.1956 }; // London coordinates (default center)

const RestaurantMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc", // Replace with your actual key
  });

  const [restaurants, setRestaurants] = useState([
    { name: "Pizza Place", lat: 51.509, lng: -0.128 },
    { name: "Sushi Spot", lat: 51.503, lng: -0.12 },
    { name: "Burger Joint", lat: 51.505, lng: -0.13 },
  ]);

  useEffect(() => {
    if (isLoaded) {
      const map = new window.google.maps.Map(document.getElementById("map")!, {
        center: center,
        zoom: 13,
      });

      // Loop through restaurant data and add markers
      restaurants.forEach((restaurant) => {
        new window.google.maps.Marker({
          position: { lat: restaurant.lat, lng: restaurant.lng },
          map: map,
          title: restaurant.name,
        });
      });
    }
  }, [isLoaded, restaurants]); // Re-run when isLoaded or restaurants change

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <div id="map" style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default RestaurantMap;



























// import React, { useEffect } from 'react';
// import { useJsApiLoader } from '@react-google-maps/api';

// const center = { lat: 51.5074, lng: -0.1278 }; // London coordinates

// const RestaurantMap: React.FC = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc"
//   });

//   useEffect(() => {
//     if (isLoaded) {
//       const map = new window.google.maps.Map(document.getElementById('map')!, {
//         center: center,
//         zoom: 13,
//       });

//       // Add a marker for demonstration
//       new window.google.maps.Marker({
//         position: center,
//         map: map,
//         title: "London"
//       });
//     }
//   }, [isLoaded]);

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       <div id="map" style={{ height: '100%', width: '100%' }} />
//     </div>
//   );
// };

// export default RestaurantMap;
