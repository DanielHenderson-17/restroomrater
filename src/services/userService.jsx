export const getAllUsers = () => {
  return fetch('https://restroom-rater-api.onrender.com/users').then(res => res.json());
};

export const getUserByEmail = (email) => {
  return fetch(`https://restroom-rater-api.onrender.com/users?email=${email}`).then(res => res.json());
};

export const createUser = (customer) => {
  return fetch("https://restroom-rater-api.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then(res => res.json());
};
