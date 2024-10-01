import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../utils/loadGoogleMaps"; // Ensure this is the correct path
import "./Map.css";

export const Map = ({ searchResults }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    // Load the Google Maps script and initialize the map
    loadGoogleMaps(apiKey)
      .then((googleMaps) => {
        const initializedMap = new googleMaps.Map(mapRef.current, {
          center: { lat: 35.8456, lng: -86.3903 }, // Default center location
          zoom: 12,
          mapTypeControlOptions: {
            style: googleMaps.MapTypeControlStyle.HORIZONTAL_BAR, // Set style for controls
            position: googleMaps.ControlPosition.BOTTOM_RIGHT, // Change position of map type control
          },
        });

        setMap(initializedMap);
      })
      .catch((err) => {
        console.error("Failed to load Google Maps API", err);
      });
  }, []);

  useEffect(() => {
    if (map && searchResults && searchResults.length > 0) {
      // Clear existing markers
      const markers = [];

      searchResults.forEach((result) => {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);

        // Create a marker for each search result
        const marker = new window.google.maps.Marker({
          position: { lat, lng: lon },
          map,
          title: result.name || result.display_name || "Unnamed location",
        });

        markers.push(marker);
      });

      // Optionally fit the map to show all markers
      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
      }
    }
  }, [map, searchResults]);

  return <div ref={mapRef} className="map-container" />;
};
