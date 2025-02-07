import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import AnimatedLogo from './AnimatedLogo';
import AnimatedDots from './AnimatedDots';

const mapContainerStyle = {
    height: '80vh',
    width: '80%',
    margin: '0 auto',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const mapOptions = {
    styles: [
        {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }],
        },
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#FC8A06' }],
        },
        {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e0e0e0' }],
        },
    ],
};

const WorkSpace: React.FC = () => {
    const [userLat, setUserLat] = useState<number | null>(null);
    const [userLng, setUserLng] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasWaited, setHasWaited] = useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyB5gnUWjb84t6klt5vcPjMOQylhQRFB5Wc',
    });

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLat(latitude);
                    setUserLng(longitude);
                    // Wait for at least 3 seconds before allowing the map to show
                    if (!hasWaited) {
                        setTimeout(() => {
                            setHasWaited(true);
                            setIsLoading(false);
                        }, 3000);
                    }
                },
                (error) => {
                    console.log(`Error getting location: ${error.message}`);
                    setIsLoading(false);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetLocation();
    }, []);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    if (isLoading || userLat === null || userLng === null || !hasWaited) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center space-y-8">
                    <AnimatedLogo />
                    <h1 className="text-3xl font-bold text-gray-800 animate-pulse">
                        Getting your location...
                    </h1>
                    <AnimatedDots />
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={{ lat: userLat, lng: userLng }}
                    options={mapOptions}
                >
                    {isLoaded && userLat && userLng && (
                        <Marker
                            position={{ lat: userLat, lng: userLng }}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/micons/red-pushpin.png',
                                scaledSize: new window.google.maps.Size(40, 40),
                                anchor: new window.google.maps.Point(10, 40),
                            }}
                            title="Your Location"
                            animation={window.google.maps.Animation.BOUNCE}
                        />
                    )}
                </GoogleMap>
            </div>
        </div>
    );
};

export default WorkSpace;