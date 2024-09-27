export const getAllLocations = () => {
  return fetch('http://localhost:8088/locations?_embed=ratings')
    .then(res => res.json());
};

export const submitRating = (newReview) => {
  return fetch(`http://localhost:8088/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReview),
  })
  .then((response) => response.json())
  .then(() => getAllLocations());
};

export const updateRating = (reviewId, updatedReview) => {
  return fetch(`http://localhost:8088/ratings/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedReview),
  })
  .then(() => getAllLocations());
};

export const deleteRating = (reviewId) => {
  return fetch(`http://localhost:8088/ratings/${reviewId}`, {
    method: "DELETE",
  })
  .then(() => getAllLocations());
};

export const getReviewById = (reviewId) => {
  return fetch(`http://localhost:8088/ratings/${reviewId}`).then(res => res.json());
};

export const addLocationAndRating = (newLocation, newRating) => {
  return fetch('http://localhost:8088/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newLocation),
  })
    .then((res) => res.json())
    .then((addedLocation) => {
      newRating.locationId = addedLocation.id;
      return fetch('http://localhost:8088/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRating),
      });
    })
    .then(() => getAllLocations());
};
