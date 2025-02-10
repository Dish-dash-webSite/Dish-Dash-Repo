import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

interface DriverLocation {
  lat: number;
  lng: number;
  driverId: string;
  orderId: string;
  phoneNumber?: string;
  timestamp?: string;
}

const SOCKET_URL = 'http://localhost:3001';
const GOOGLE_MAPS_API_KEY = 'AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [panTimer, setPanTimer] = useState<NodeJS.Timeout | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setOptions({
      gestureHandling: 'cooperative',
      panControl: true,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
    });
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && driverLocation) {
      if (panTimer) clearTimeout(panTimer);

      const timer = setTimeout(() => {
        const newCenter = new google.maps.LatLng(driverLocation.lat, driverLocation.lng);
        map.panTo(newCenter);
      }, 1000);

      setPanTimer(timer);
    }

    return () => {
      if (panTimer) clearTimeout(panTimer);
    };
  }, [map, driverLocation]);

  const initializeSocket = useCallback(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    });

    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);
      setConnected(true);
      setError(null);

      if (isVerified && orderId) {
        socket.emit('join-order-tracking', { orderId, phoneNumber });
      }
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError(`Connection error: ${err.message}`);
      setConnected(false);
    });

    socket.on('tracking-confirmed', (data) => {
      console.log('Tracking confirmed:', data);
    });

    socket.on('driver-location-update', (location: DriverLocation) => {
      console.log('Received location update:', location);
      setDriverLocation(location);
    });

    return socket;
  }, [orderId, phoneNumber, isVerified]);

  useEffect(() => {
    const socket = initializeSocket();

    return () => {
      console.log('Cleaning up socket connection');
      socket.disconnect();
    };
  }, [initializeSocket]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerified(true);
  };

  const renderMap = () => {
    return (
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={driverLocation || defaultCenter}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            scrollwheel: true,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
            styles: [
              {
                featureType: "all",
                elementType: "all",
                stylers: [
                  { smoothness: 100 }
                ]
              }
            ]
          }}
        >
          {driverLocation && (
            <Marker
              position={{ lat: driverLocation.lat, lng: driverLocation.lng }}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(50, 50),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(25, 25)
              }}
              title="Driver Location"
            />
          )}
        </GoogleMap>
      </LoadScript>
    );
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Error: {error}
        <button 
          onClick={() => initializeSocket()}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <span className={`
          inline-flex items-center px-4 py-2 rounded-full
          ${connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          text-sm font-medium
        `}>
          <span className={`
            w-3 h-3 mr-2 rounded-full
            ${connected ? 'bg-green-500' : 'bg-red-500'}
          `}></span>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {!isVerified ? (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Your Order</h2>
              <p className="text-gray-600">Enter your phone number to verify and track your order</p>
            </div>
            
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg 
                      className="h-5 w-5 text-gray-400" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="
                      block w-full pl-10 pr-4 py-3
                      border-gray-300 rounded-lg
                      focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                      transition duration-150 ease-in-out
                      text-gray-900 placeholder-gray-500
                    "
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the phone number associated with your order
                </p>
              </div>

              <button
                type="submit"
                className="
                  w-full flex justify-center items-center
                  px-6 py-3 rounded-lg
                  bg-orange-600 hover:bg-orange-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                  text-white font-medium
                  transition duration-150 ease-in-out
                  transform hover:scale-[1.02]
                "
              >
                <span>Track Order</span>
                <svg 
                  className="ml-2 h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Order Tracking</h2>
            <div className="mb-6">
              {renderMap()}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    Order ID: {orderId}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone: {phoneNumber}
                  </p>
                </div>
              </div>
              {driverLocation && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Location</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Location: {driverLocation.lat.toFixed(4)}, {driverLocation.lng.toFixed(4)}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Driver ID: {driverLocation.driverId}
                    </p>
                    {driverLocation.timestamp && (
                      <p className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Last Update: {new Date(driverLocation.timestamp).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking; 