import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '450px',
  borderRadius: '20px'
};

const center = {
  lat: -1.2921, // Default coordinates (Nairobi)
  lng: 36.8219
};

export const PropertyMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return (
    <div className="d-flex justify-content-center align-items-center h-64 bg-light rounded-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading Map...</span>
      </div>
    </div>
  );

  return (
    <div className="map-container my-5 shadow-lg rounded-4 overflow-hidden border">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
        }}
      >
        <Marker 
          position={center} 
          label="Kijana Cribs HQ"
        />
      </GoogleMap>
    </div>
  );
};