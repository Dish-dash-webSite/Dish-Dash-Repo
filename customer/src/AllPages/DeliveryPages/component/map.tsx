import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
    height: '70vh',
    width: '70%',
};

const center = {
    lat: 37.7749, 
    lng: -122.4194,
};

const WorkSpace: React.FC = () => {
    const [userLat, setUserLat] = useState<number | null>(null);
    const [userLng, setUserLng] = useState<number | null>(null);

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

    useEffect(() => {
        handleGetLocation();
    }, []);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;
    if (userLat === null || userLng === null) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleGetLocation}>Get My Location</button>
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={13}
                    center={{ lat: userLat, lng: userLng }}
                >
                    <Marker
                        position={{ lat: userLat, lng: userLng }}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        }}
                    />
                </GoogleMap>
            </div>
        </div>
    );
};

export default WorkSpace;