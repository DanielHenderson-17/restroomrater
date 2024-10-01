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

export const searchNominatim = async (query) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`;
  
  console.log("Making API request to:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await res.json();
    console.log("API Response:", data); // Log the response
    return data;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
};




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
