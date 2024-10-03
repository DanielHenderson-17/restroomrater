import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadGoogleMaps } from "../../utils/loadGoogleMaps";
import "./Map.css";

export const Map = ({ searchResults }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]); 
  const [map, setMap] = useState(null);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const navigate = useNavigate();


  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  };

  const reverseGeocodeLatLng = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const addressComponents = data.results[0].address_components;
      let city = "";
      let state = "";

      addressComponents.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.short_name;
        }
      });

      return { city, state };
    } else {
      console.error("Reverse geocoding failed:", data.status);
      return { city: "", state: "" };
    }
  };

  useEffect(() => {
    loadGoogleMaps(apiKey)
      .then((googleMaps) => {
        const initializedMap = new googleMaps.Map(mapRef.current, {
          center: { lat: 35.8456, lng: -86.3903 }, // Default center Murfreesboro, TN
          zoom: 12,
          mapTypeControlOptions: {
            style: googleMaps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: googleMaps.ControlPosition.BOTTOM_RIGHT,
          },
        });
        setMap(initializedMap);
      })
      .catch((err) => {
        console.error("Failed to load Google Maps API", err);
      });
  }, [apiKey]);

  useEffect(() => {
    if (map) {

      clearMarkers();

      if (searchResults && searchResults.length > 0) {
        searchResults.forEach((result) => {
          const lat = parseFloat(result.geometry.location.lat);
          const lon = parseFloat(result.geometry.location.lng);

          const marker = new window.google.maps.Marker({
            position: { lat, lng: lon },
            map,
            title: result.name || result.display_name || "Unnamed location",
          });

          reverseGeocodeLatLng(lat, lon).then(({ city, state }) => {
            marker.addListener("click", () => {
              navigate("/new-review", {
                state: {
                  name: result.name,
                  address: result.formatted_address.replace(", United States", ""),
                  city,
                  state,
                  imgUrl: result.photos?.[0]?.photo_reference
                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${apiKey}`
                    : "",
                  lat,
                  lng: lon,
                },
              });
            });
          });

          markersRef.current.push(marker);
        });
        if (markersRef.current.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          markersRef.current.forEach((marker) => bounds.extend(marker.getPosition()));
          map.fitBounds(bounds);
        }
      }
    }
  }, [map, searchResults, apiKey, navigate]);

  return <div ref={mapRef} className="map-container" />;
};
