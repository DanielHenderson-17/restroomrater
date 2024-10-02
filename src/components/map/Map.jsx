import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../../utils/loadGoogleMaps"; // Ensure this is the correct path
import "./Map.css";

export const Map = ({ searchResults }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Correctly accessing the API key

  useEffect(() => {
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
  }, [apiKey]);

  useEffect(() => {
    if (map && searchResults && searchResults.length > 0) {
      // Clear existing markers
      const markers = [];

      searchResults.forEach((result) => {
        const lat = parseFloat(result.geometry.location.lat);
        const lon = parseFloat(result.geometry.location.lng);

        // Create a marker for each search result
        const marker = new window.google.maps.Marker({
          position: { lat, lng: lon },
          map,
          title: result.name || result.display_name || "Unnamed location",
        });

        // Retrieve the first photo if available
        let photoUrl = '';
        if (result.photos && result.photos.length > 0) {
          const photoReference = result.photos[0].photo_reference;
          photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        }

        // Set up the infowindow with the photo (if available), name, and address
        const infowindow = new window.google.maps.InfoWindow({
          content: `
            <div style="text-align: center;">
              ${photoUrl ? `<img src="${photoUrl}" alt="${result.name}" style="width:100%; max-height:150px; object-fit:cover; margin-bottom:10px;">` : ''}
              <h4>${result.name}</h4>
              <p>${result.formatted_address}</p>
            </div>
          `,
        });

        // Add a click listener to the marker
        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
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
  }, [map, searchResults, apiKey]);

  return <div ref={mapRef} className="map-container" />;
};
