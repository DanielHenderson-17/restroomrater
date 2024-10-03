import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getReviewById,
  updateRating,
  deleteRating,
  getAllLocations,
} from "../../services/locationService.jsx";
import { Stars } from "../shared/Stars.jsx";
import { calculateAverageRating } from "../../utils/calculateAverageRating.js";
import "./ReviewLocation.css";
import { motion } from "framer-motion";

export const EditReview = ({ currentUser, updateLocations }) => {
  const { locationId, reviewId } = useParams();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(null);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReviewById(reviewId).then((fetchedReview) => {
      setReview(fetchedReview);
      setStars(fetchedReview.stars);
      setComment(fetchedReview.comment);
    });

    getAllLocations().then((fetchedLocations) => {
      const selectedLocation = fetchedLocations.find(
        (loc) => loc.id === parseInt(locationId)
      );
      setLocation(selectedLocation);
    });
  }, [reviewId, locationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedReview = {
      ...review,
      stars: stars,
      comment: comment,
      date: new Date().toISOString(),
      edited: true,
    };
  
    updateRating(review.id, updatedReview).then((updatedLocations) => {
      updateLocations(updatedLocations);
      navigate(`/locations/${locationId}`);
    });
  };
  

  const handleDelete = () => {
    deleteRating(review.id).then((updatedLocations) => {
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

  if (!review || !location) return <p>Loading...</p>;

  return (
    <motion.div
      className="card edit-review w-100 h-100 col-4 mx-auto mt-5 position-relative"
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
      <form
        onSubmit={handleSubmit}
        className="text-center col-11 mx-auto mt-5 p-0"
      >
        {currentUser && (
          <div className="user-info text-center mb-0 d-flex justify-content-start align-items-center mt-5">
            <img
              src={currentUser.imgUrl || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="user-avatar me-2"
            />
            <h5 className="text-start">{currentUser.name}</h5>
          </div>
        )}
        <div className="d-flex justify-content-start align-items-center fs-2 mb-2">
          <Stars stars={stars} onClick={handleStarClick} />
        </div>
        <div className="d-block mx-auto w-100">
          <textarea
            className="edit-review-text-area col-12 mx-0 ps-3 pt-2"
            id="comment"
            placeholder="Edit your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end mx-auto my-3">
          <button type="submit" className="btn btn-success my-2 me-3">
            Update
          </button>
          <button
            type="button"
            className="btn btn-danger my-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </motion.div>
  );
};
