const baseUrl = 'http://localhost:8088';

const apiFetch = (endpoint, method = 'GET', data = null) => {
  return fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  }).then(res => {
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  });
};


export const searchGooglePlaces = async (query) => {
  try {
    const response = await fetch("/.netlify/functions/searchPlaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Google Places API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error);
    return [];
  }
};
// export const searchGooglePlaces = async (query) => {
//   try {
//     const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

//     const proxyUrl = "http://localhost:8080/";
//     const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;

//     const response = await fetch(proxyUrl + url);
//     if (!response.ok) {
//       throw new Error("Failed to fetch from Google Places API");
//     }

//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching data from Google Places API:", error);
//     return [];
//   }
// };


export const getAllLocations = () => {
  return apiFetch('/locations?_embed=ratings');
};

export const submitRating = (newReview) => {
  return apiFetch('/ratings', 'POST', newReview)
    .then(() => getAllLocations());
};

export const updateRating = (reviewId, updatedReview) => {
  return apiFetch(`/ratings/${reviewId}`, 'PUT', updatedReview)
    .then(() => getAllLocations());
};

export const deleteRating = (reviewId) => {
  return apiFetch(`/ratings/${reviewId}`, 'DELETE')
    .then(() => getAllLocations());
};

export const getReviewById = (reviewId) => {
  return apiFetch(`/ratings/${reviewId}`);
};

export const addLocationAndRating = (newLocation, newRating) => {
  return apiFetch('/locations', 'POST', newLocation)
    .then((addedLocation) => {
      newRating.locationId = addedLocation.id;
      return apiFetch('/ratings', 'POST', newRating);
    })
    .then(() => getAllLocations());
};
