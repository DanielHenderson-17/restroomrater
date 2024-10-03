import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  submitRating,
  getAllLocations,
} from "../../services/locationService.jsx";
import { Stars } from "../shared/Stars.jsx";
import { calculateAverageRating } from "../../utils/calculateAverageRating.js";
import "./ReviewLocation.css";
import { motion } from "framer-motion";

export const ReviewLocation = ({ currentUser, updateLocations }) => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
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
    if (!location || !currentUser) return;

    const existingReview = location.ratings.find(
      (review) => review.userId === currentUser.id
    );

    if (existingReview) {
      alert("You have already made a review for this location.");
    }
  }, [location, currentUser]);

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
      locationId: location.id,
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

  const handleCloseClick = () => {
    navigate("/");
  };

  if (!location) return <p>Loading...</p>;

  return (
    <motion.div
      className="card review-loc w-100 h-100 col-4 mx-auto mt-5 position-relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close"
        onClick={handleCloseClick}
      ></button>
      <div className="location-card d-flex justify-content-start w-100">
        <img src={location.imgUrl} alt="" className="review-img" />
        <div className="ms-1 pt-2">
          <h2 className="ms-3">{location.name}</h2>
          <div className="d-flex justify-content-start align-items-center ms-3">
            <p className="average-rating me-1 amount my-0 fs-6">
              {calculateAverageRating(location.ratings)}
            </p>
            <Stars stars={calculateAverageRating(location.ratings)} />
            <p className="my-0">({location.ratings.length})</p>
          </div>
          <p className="my-0 ms-3 pe-2">
            {location.address.replace(", United States", "")}
          </p>
        </div>
      </div>
      <div className="mx-auto mt-5 w-100">
        {currentUser && (
          <div className="user-info text-center mb-0 d-flex justify-content-start align-items-center mt-5 text-left w-75 ms-3">
            <img
              src={currentUser.imgUrl || "https://via.placeholder.com/40"}
              alt="User avatar"
              className="user-avatar ms-5"
            />
            <h4 className="text-center ms-2">{currentUser.name}</h4>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="text-center mt-0 p-0 mb-0 w-75 mx-auto"
        >
          <div className="d-flex justify-content-center align-items-center fs-1 mb-3">
            <Stars stars={stars} onClick={handleStarClick} />
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
            <button type="submit" className="btn btn-success my-2">
              Post
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
