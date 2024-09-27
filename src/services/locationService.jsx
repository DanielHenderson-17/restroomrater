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
