export const getAllLocations = () => {
    return fetch('http://localhost:8088/locations?_embed=ratings')
      .then(res => res.json());
  };
  