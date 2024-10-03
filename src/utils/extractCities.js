export const extractCities = (locations) => {
    const cities = locations.map((location) => {
      const addressParts = location.address.split(", ");
      return addressParts.length > 1 ? addressParts[1] : "Unknown City";
    });
  
    return [...new Set(cities)];
  };
  