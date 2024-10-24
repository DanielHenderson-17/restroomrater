export const loadGoogleMaps = (apiKey) => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
        return;
      }
  
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
  
      script.onload = () => resolve(window.google.maps);
      script.onerror = (err) => reject(err);
  
      document.head.appendChild(script);
    });
  };
  