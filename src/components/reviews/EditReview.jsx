import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReviewById, updateRating, deleteRating } from "../../services/locationService.jsx";
import { Stars } from "../shared/Stars.jsx"; // Reuse Stars component
import "./RateLocation.css";

export const EditReview = ({ currentUser, updateLocations }) => {
  const { locationId, reviewId } = useParams();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReviewById(reviewId).then((fetchedReview) => {
      setReview(fetchedReview);
      setStars(fetchedReview.stars);
      setComment(fetchedReview.comment);
    });
  }, [reviewId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedReview = {
      ...review,
      stars: stars,
      comment: comment,
      date: new Date().toISOString(),
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

  if (!review) return <p>Loading...</p>;

  return (
    <div className="card col-4 mx-auto mt-5 pt-5">
      <h2 className="text-center">Edit Review</h2>
      

      <form onSubmit={handleSubmit} className="text-center col-11 mx-auto mt-0 p-0">
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
            className="new-rating-text-area col-12 mx-0 ps-3 pt-2"
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
    </div>
  );
};
