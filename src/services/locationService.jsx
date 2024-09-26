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
  }).then((response) => response.json());
};

  