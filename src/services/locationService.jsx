import fetch from "node-fetch";

const baseUrl = "https://restroom-rater-api.onrender.com";

const apiFetch = (endpoint, method = 'GET', data = null) => {
  return fetch(`${baseUrl}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  }).then(res => {
    if (!res.ok) {
      console.error(`Failed to fetch from ${endpoint}: ${res.statusText}`);
      throw new Error('Failed to fetch');
    }
    return res.json();
  });
};

export const searchGooglePlaces = async (query) => {
  try {
    const response = await fetch("https://restroom-rater.netlify.app/.netlify/functions/searchPlaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error(`Error in searchGooglePlaces: ${response.statusText}`);
      throw new Error("Failed to fetch from Google Places API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error);
    return [];
  }
};

// Location-related API calls
export const getAllLocations = async () => {
  try {
    const locations = await apiFetch('/locations');
    const ratings = await apiFetch('/ratings');
    
    // Manually embed ratings if expand queries are not supported
    return locations.map(location => ({
      ...location,
      ratings: ratings.filter(rating => rating.locationId === location.id)
    }));
  } catch (error) {
    console.error("Error fetching locations with embedded ratings:", error);
    return [];
  }
};

// Rating-related API calls
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
