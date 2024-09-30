import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLocations } from "../../services/locationService.jsx";
import { getAllUsers } from "../../services/userService.jsx";
import { Stars } from "../shared/Stars.jsx";
import "./Locations.css";

export const Location = ({ currentUser, locationId }) => {
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState([]);
  const [userReviewCounts, setUserReviewCounts] = useState({}); // State to store review counts
  const navigate = useNavigate();

  useEffect(() => {
    getAllLocations().then((fetchedLocations) => {
      const selectedLocation = fetchedLocations.find(
        (loc) => loc.id === parseInt(locationId)
      );
      setLocation(selectedLocation);

      // Count the number of reviews each user has made across all locations
      const reviewCounts = {};
      fetchedLocations.forEach((location) => {
        location.ratings.forEach((rating) => {
          if (reviewCounts[rating.userId]) {
            reviewCounts[rating.userId] += 1;
          } else {
            reviewCounts[rating.userId] = 1;
          }
        });
      });
      setUserReviewCounts(reviewCounts); // Save the review counts
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
    return (totalStars / ratings.length).toFixed(1);
  };

  if (!location || users.length === 0) return <p>Loading...</p>;

  return (
    <div className="location-details">
      <div className="location-card">
        <img
          src={location.imgUrl || "https://via.placeholder.com/80"}
          alt={location.name}
          className="location-image2 w-100"
        />
        <div className="location-details mt-3">
          <h2 className="ms-3">{location.name}</h2>
          <div className="d-flex justify-content-start align-items-center ms-3">
            <p className="average-rating me-1 amount my-0 fs-6">
              {calculateAverageRating(location.ratings)}
            </p>
            <Stars stars={calculateAverageRating(location.ratings)} />
            <p className="my-0">({location.ratings.length})</p>
          </div>
          <p className="my-0 ms-3">{location.address}</p>
          <p className="ms-3">
            {location.city}, {location.state}
          </p>
        </div>
      </div>

      {/* Display reviews */}
      <div className="reviews">
        {location.ratings.map((review) => {
          const user = users.find((user) => user.id === review.userId);
          const isCurrentUser = currentUser && currentUser.id === review.userId;
          const reviewCount = userReviewCounts[review.userId] || 0; // Get the total review count for this user

          return (
            <div key={review.id} className="review-card pe-4 mt-5 border-bottom pb-4">
              <div className="review-header ms-4 d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      user && user.imgUrl
                        ? user.imgUrl
                        : "https://via.placeholder.com/40"
                    }
                    alt="user avatar"
                    className="review-avatar rounded-circle me-2"
                  />
                  <div>
                    <p className="d-block my-0 fw-bolder">{user ? user.name : "Unknown User"}</p>
                    <p className="d-block my-0">
                      {reviewCount} {reviewCount === 1 ? "review" : "reviews"} {/* Display the review count */}
                    </p>
                  </div>
                </div>
                {isCurrentUser && (
                  <div className="dropdown ms-auto">
                    <div
                      className="dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate(`/locations/${locationId}/edit/${review.id}`)}
                        >
                          Edit
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="review-rating-date ms-4 d-flex justify-content-start mb-2">
                <span className="rating-stars fs-5">
                  <Stars stars={review.stars} />
                </span>
                <span className="review-date align-self-center ms-2">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="review-comment ms-4">{review.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
