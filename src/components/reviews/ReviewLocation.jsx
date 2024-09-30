import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitRating } from "../../services/locationService.jsx";
import { Stars } from "../shared/Stars.jsx"; // Reuse Stars component
import "./ReviewLocation.css";

export const ReviewLocation = ({ currentUser, locations, updateLocations }) => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [hasAlerted, setHasAlerted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedLocation = locations.find((loc) => loc.id === parseInt(locationId));
    if (selectedLocation) {
      setLocation(selectedLocation);

      const existingReview = selectedLocation.ratings.find(
        (review) => review.userId === currentUser.id
      );

      if (existingReview && !hasAlerted) {
        setHasAlerted(true);
        alert("You have already made a review for this location.");
        navigate(`/locations/${locationId}`);
      }
    }
  }, [locationId, locations, currentUser, navigate, hasAlerted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("No logged-in user found.");
      return;
    }

    const newReview = {
      userId: currentUser.id,
      stars: stars,
      comment: comment,
      locationId: parseInt(locationId),
      date: new Date().toISOString(),
    };

    submitRating(newReview).then((updatedLocations) => {
      updateLocations(updatedLocations);
      navigate(`/locations/${locationId}`);
    });
  };

  const handleStarClick = (rating) => {
    setStars(rating);
  };

  return location ? (
    <div>
      <div className="location-card mb-3 mx-auto col-8 shadow-sm p-3 mb-5 bg-white rounded">
        <img
          src={location.imgUrl ? location.imgUrl : "https://via.placeholder.com/80"}
          alt={location.name}
          className="location-image"
        />
        <div className="location-details2">
          <h5>{location.name}</h5>
          <p>{location.address}</p>
          <p>{location.city}, {location.state}</p>
          <div className="d-flex justify-content-center align-items-center">
            <Stars ratings={location.ratings} /> {/* Reuse Stars component for display */}
            <p className="pt-1">({location.ratings.length})</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 card review-card">
        {currentUser && (
          <div className="user-info text-center mb-0 d-flex justify-content-start align-items-center mt-5 text-left w-100">
            <img
              src={currentUser.imgUrl || "https://via.placeholder.com/40"}
              alt="User avatar"
              className="user-avatar"
            />
            <h4 className="text-start ms-2">{currentUser.name}</h4>
          </div>
        )}
        <form onSubmit={handleSubmit} className="text-center mt-0 pt-0 mb-0">
          <div className="d-flex justify-content-center align-items-center fs-1">
            <Stars stars={stars} onClick={handleStarClick} />
          </div>
          <div className="d-block mx-auto">
            <textarea
              className="w-100 text-area"
              id="comment"
              placeholder="Share details of your own experience at this place"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="text-end mt-5 mb-0">
            <button
              type="button"
              className="btn btn-secondary my-2 me-3 text-end"
              onClick={() => navigate(`/locations/${locationId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success my-2">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};
