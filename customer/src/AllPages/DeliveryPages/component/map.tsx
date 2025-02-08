import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
};

const center: google.maps.LatLngLiteral = { lat: 36.812048, lng: 10.138082 };

interface Restaurant {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const fakeRestaurants: Restaurant[] = [
  { id: 1, name: "La Bella Cucina", lat: 36.814048, lng: 10.138582 },
  { id: 2, name: "Pasta Paradise", lat: 36.813048, lng: 10.140582 },
  { id: 3, name: "Sushi Supreme", lat: 36.811048, lng: 10.142582 },
  { id: 4, name: "Burger Bliss", lat: 36.810048, lng: 10.144582 },
  { id: 5, name: "Taco Tower", lat: 36.812048, lng: 10.146582 },
];

interface LiveMapProps {
  onMapLoaded: () => void;
}

const LiveMap: React.FC<LiveMapProps> = ({ onMapLoaded }) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (mapLoaded) onMapLoaded();
  }, [mapLoaded, onMapLoaded]);

  useEffect(() => {
    console.log("Map Loaded:", mapLoaded);
    console.log("User Location:", userLocation);
    console.log("Restaurants Data:", fakeRestaurants);
  }, [mapLoaded, userLocation]);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          console.log("User position:", latitude, longitude);
        },
        (error) => console.error("Error getting position:", error)
      );
    }
  }, []);

  return (
    <GoogleMap 
      mapContainerStyle={containerStyle} 
      center={center} 
      zoom={12} 
      onLoad={() => setMapLoaded(true)}
    >
      {/* Display user's location if available */}
      {userLocation && (
        <Marker
          position={userLocation}
          title="Your Location"
          icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
          onClick={() => alert("You clicked on your location")}
        />
      )}
      
      {/* Render restaurant markers dynamically */}
      {fakeRestaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={{ lat: restaurant.lat, lng: restaurant.lng }}
          title={restaurant.name}
          onClick={() => alert(`You clicked on ${restaurant.name}`)}
        />
      ))}
    </GoogleMap>
  );
};

export default LiveMap;
