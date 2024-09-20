import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllLocations } from "../../services/locationService.jsx";
import { getAllUsers } from "../../services/userService.jsx";
import "./Locations.css";

export const Location = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState([]);

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

  if (!location || users.length === 0) return <p>Loading...</p>;

  return (
    <div className="location-details">
      <div className="location-card">
        <img
          src={location.imgUrl || "https://via.placeholder.com/80"}
          alt={location.name}
          className="location-image"
        />
        <div className="location-details">
          <h2>{location.name}</h2>
          <p>{location.address}</p>
          <p>
            {location.city}, {location.state}
          </p>
          <p className="rating-stars">
            {renderStars(calculateAverageRating(location.ratings))}
          </p>
          <p>({location.ratings.length})</p>
        </div>
      </div>

      <h3>Reviews</h3>
      <div className="reviews">
  {location.ratings.map((review) => {
    const user = users.find(user => user.id === review.userId);
    return (
      <div key={review.id} className="review-card">
        <div className="review-header">
          <img src="https://via.placeholder.com/40" alt="user avatar" className="review-avatar" />
          <strong>{user ? user.name : "Unknown User"}</strong>
        </div>
        <div className="review-rating-date">
          <span className="rating-stars">{renderStars(review.stars)}</span>
          <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
        </div>
        <p className="review-comment">{review.comment}</p>
      </div>
    );
  })}
</div>

    </div>
  );
};
