import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

//------------- Connection Logs -------------
socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Connection error:", err);
});

//------------------- Map Styles -------------------
const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
};

const center: google.maps.LatLngLiteral = { lat: 36.812048, lng: 10.138082 };

interface Restaurant {
  name: string;
  id: number;
  lat: number;
  lng: number;
}

interface Order {
  id: number;
  customerId: number;
  totalAmount: number;
  deliveryAddress: string;
  paymentStatus: string;
  restaurantId: number; // Add restaurantId to Order interface
}

interface LiveMapProps {
  onMapLoaded: () => void;
}

const LiveMap: React.FC<LiveMapProps> = ({ onMapLoaded }) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [displayedRestaurants, setDisplayedRestaurants] = useState<Restaurant[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurantDetails, setRestaurantDetails] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (mapLoaded) onMapLoaded();
  }, [mapLoaded, onMapLoaded]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          console.log("📍 Updated User position:", latitude, longitude);
        },
        (error) => console.error("⚠️ Error watching position:", error),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    }
  }, []);

  // Fetch locations from server
  useEffect(() => {
    socket.emit("fetchInitialData");

    socket.on("initialData", (locations) => {
      console.log("✅ Received locations from server:", locations);

      const mappedLocations: Restaurant[] = locations.map((location: any) => ({
        name: location.name,
        id: location.id,
        lat: location.latitude,
        lng: location.longitude,
      }));

      setAllRestaurants(mappedLocations);
      setLoading(false);
    });

    return () => {
      socket.off("initialData");
    };
  }, []);

  useEffect(() => {
    socket.emit("fetchOrders"); // Fetch orders for all restaurants

    socket.on("ordersForAllRestaurants", (orders) => {
      console.log("✅ Received orders for all restaurants:", orders);
      setOrders(orders); // Store all orders for rendering
    });

    return () => {
      socket.off("ordersForAllRestaurants");
    };
  }, []); // This will run once on component mount

  // Add markers one by one with a delay
  useEffect(() => {
    if (index < allRestaurants.length) {
      const timer = setTimeout(() => {
        setDisplayedRestaurants((prev) => [...prev, allRestaurants[index]]);
        console.log("🛑 Added marker:", allRestaurants[index]);
        setIndex(index + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [index, allRestaurants]);

  const fetchRestaurantDetails = (restaurantId: number) => {
    socket.emit("fetchRestoById", { id: restaurantId });

    socket.on("restoById", (restaurant: Restaurant) => {
      console.log("✅ Restaurant details:", restaurant);
      setRestaurantDetails(restaurant);
      console.log("🏪 Updated restaurantDetails state:", restaurant);
    });

    return () => {
      socket.off("restoById");
    };
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    fetchRestaurantDetails(restaurant.id);
  };

  const handleCloseInfoWindow = () => {
    setSelectedRestaurant(null);
    setOrders([]); // Clear orders when InfoWindow is closed
  };

  // Filter orders for the selected restaurant
  const filteredOrders = selectedRestaurant
    ? orders.filter((order) => order.restaurantId === selectedRestaurant.id)
    : [];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      {loading && (
        <div className="flex justify-center items-center h-96">
          <p className="text-xl font-semibold text-gray-300">Loading restaurant locations...</p>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={() => setMapLoaded(true)}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }], // Hide POI labels
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }], // Hide transit labels
            },
          ],
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            title="Your Location"
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
          />
        )}

        {displayedRestaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={{ lat: restaurant.lat, lng: restaurant.lng }}
            title="Restaurant"
            onClick={() => handleRestaurantClick(restaurant)}
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }} // Red marker for restaurants
          />
        ))}

        {selectedRestaurant && (
          <InfoWindow
            position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
            onCloseClick={handleCloseInfoWindow}
          >
            <div className="bg-gray-800 p-4 rounded-lg shadow-xl max-w-sm">
              <h3 className="text-xl font-bold mb-3 text-white">
                Restaurant Name: {restaurantDetails}
              </h3>
              <h4 className="text-lg font-semibold mb-2 text-gray-300">Orders</h4>
              <ul className="space-y-3">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <li key={order.id} className="bg-gray-700 p-3 rounded-md">
                      <p className="text-gray-200"><strong>Total:</strong> ${order.totalAmount}</p>
                      <p className="text-gray-200"><strong>Address:</strong> {order.deliveryAddress}</p>
                      <p className="text-gray-200"><strong>Status:</strong> {order.paymentStatus}</p>
                      <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Deliver Order
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400">No orders for this restaurant.</p>
                )}
              </ul>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Debugging: Show fetched data */}
   <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
  <pre className="text-sm text-gray-300 overflow-x-auto">
    <h2 className="text-lg font-semibold text-white mb-4">
      Here is the list of available orders for you:
    </h2>
    <ul className="space-y-3">
      {orders.map((order) => (
        <li key={order.id} className="p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
          <span className="text-gray-200">
            There is an order waiting at{" "}
            <span className="font-medium text-white">{order.deliveryAddress}</span>.
          </span>
        </li>
      ))}
    </ul>
  </pre>
</div>
    </div>
  );
};

export default LiveMap;