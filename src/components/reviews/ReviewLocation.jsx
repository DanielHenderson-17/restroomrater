import { useState, useEffect } from "react";
import { submitRating } from "../../services/locationService.jsx";
import { Stars } from "../shared/Stars.jsx"; // Reuse Stars component
import "./ReviewLocation.css";

export const ReviewLocation = ({ currentUser, location, updateLocations, onClose }) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!location) return;

    // Check if the user has already reviewed this location
    const existingReview = location.ratings.find(
      (review) => review.userId === currentUser.id
    );

    if (existingReview) {
      alert("You have already made a review for this location.");
      onClose(); // Close the modal if the user already reviewed
    }
  }, [location, currentUser, onClose]);

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
      locationId: location.id, // Set locationId from the passed location prop
      date: new Date().toISOString(),
    };

    submitRating(newReview).then((updatedLocations) => {
      updateLocations(updatedLocations); // Update locations after submission
      onClose(); // Close the modal after submission
    });
  };

  const handleStarClick = (rating) => {
    setStars(rating);
  };

  return location ? (
    <div>
      {/* Location details */}
      <div className="mb-3 mx-auto col-8 p-3 mb-5 bg-white">
        <div className="text-center">
          <h5>{location.name}</h5>
        </div>
      </div>

      {/* Review form */}
      <div className="mx-auto mt-5">
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
        <form onSubmit={handleSubmit} className="text-center mt-0 p-0 mb-0 w-100 mx-auto">
          <div className="d-flex justify-content-center align-items-center fs-1 mb-3">
            <Stars stars={stars} onClick={handleStarClick} /> {/* Select star rating */}
          </div>
          <div className="d-block mx-auto">
            <textarea
              className="w-100 text-area"
              id="comment"
              placeholder="Share details of your own experience at this place"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <div className="text-end mt-5 mb-0">
            <button
              type="button"
              className="btn btn-secondary my-2 me-3 text-end"
              onClick={onClose} // Close the modal without submitting
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
