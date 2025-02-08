import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
};

const center: google.maps.LatLngLiteral = { lat: 36.812048, lng: 10.138082 };

interface Restaurant {

  lat: number;
  lng: number;
}

const fakeRestaurants: Restaurant[] = [
  {lat: 36.814048, lng: 10.138582 },
  { lat: 36.813048, lng: 10.140582 },
  { lat: 36.811048, lng: 10.142582 },
  {lat: 36.810048, lng: 10.144582 },
  {  lat: 36.812048, lng: 10.146582 },
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
          position={restaurant}
          title={"AAAA"}
          onClick={() => alert(`You clicked on `)}
        />
      ))}
    </GoogleMap>
  );
};

export default LiveMap;
