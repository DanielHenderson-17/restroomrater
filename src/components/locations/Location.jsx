import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllLocations } from "../../services/locationService.jsx";
import { getAllUsers } from "../../services/userService.jsx";
import "./Locations.css";

export const Location = ({ currentUser }) => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllLocations().then((fetchedLocations) => {
      const selectedLocation = fetchedLocations.find(
        (loc) => loc.id === parseInt(locationId)
      );
      setLocation(selectedLocation);
    });
  }, [locationId]);

  useEffect(() => {
    getAllUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const totalStars = ratings.reduce(
      (total, rating) => total + rating.stars,
      0
    );
    const averageRating = totalStars / ratings.length;
    return Math.ceil(averageRating);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star empty"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleEditClick = (reviewId) => {
    navigate(`/locations/${locationId}/edit/${reviewId}`);
  };

  // const handleDeleteClick = (reviewId) => {
  //   // Add delete logic here
  // };

  if (!location || users.length === 0) return <p>Loading...</p>;

  return (
    <div className="location-details">
      <div className="location-card">
        <img
          src={location.imgUrl || "https://via.placeholder.com/80"}
          alt={location.name}
          className="location-image"
        />
        <div className="location-details2">
          <h2>{location.name}</h2>
          <p>{location.address}</p>
          <p>
            {location.city}, {location.state}
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <p className="rating-stars mx-2">
              {renderStars(calculateAverageRating(location.ratings))}
            </p>
            <p className="pt-1">({location.ratings.length})</p>
          </div>
          <button
            className="btn w-50 mx-auto p-0 mt-2"
            onClick={() => navigate(`/locations/${locationId}/rate`)}
          >
            Rate
          </button>
        </div>
      </div>
      <h3 className="mt-5 mb-3">Reviews</h3>
      <div className="reviews">
        {location.ratings.map((review) => {
          const user = users.find((user) => user.id === review.userId);
          const isCurrentUser = currentUser && currentUser.id === review.userId;
          return (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <img
                  src={
                    user && user.imgUrl
                      ? user.imgUrl
                      : "https://via.placeholder.com/40"
                  }
                  alt="user avatar"
                  className="review-avatar"
                />
                <strong>{user ? user.name : "Unknown User"}</strong>
              </div>
              <div className="review-rating-date">
                <span className="rating-stars">
                  {renderStars(review.stars)}
                </span>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>

              {/* Show the dropdown menu only if the review belongs to the current user */}
              {isCurrentUser && (
                <div className="d-flex justify-content-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-link dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEditClick(review.id)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        {/* <button
                          className="dropdown-item"
                          onClick={() => handleDeleteClick(review.id)}
                        >
                          Delete
                        </button> */}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
