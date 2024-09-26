import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReviewById, updateRating, deleteRating } from "../../services/locationService.jsx"; // Import the service functions
import "./RateLocation.css";

export const EditReview = () => {
  const { locationId, reviewId } = useParams(); // Get locationId and reviewId from the URL
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(null); // Store the review data here
  const navigate = useNavigate();

  // Fetch the review based on reviewId
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
      ...review, // Keep the original data
      stars: stars,
      comment: comment,
      date: new Date().toISOString(), // Update the date
    };

    updateRating(review.id, updatedReview).then(() => {
      navigate(`/locations/${locationId}`);
    });
  };

  const handleDelete = () => {
    deleteRating(review.id).then(() => {
      navigate(`/locations/${locationId}`); // Redirect after deleting
    });
  };

  const renderInteractiveStars = () => {
    const starsArray = [1, 2, 3, 4, 5];
    return starsArray.map((num) => (
      <span
        key={num}
        style={{
          fontSize: '40px',
          color: num <= (hoverStars || stars) ? '#ffd700' : '#d3d3d3',
          cursor: 'pointer',
        }}
        onClick={() => setStars(num)}
        onMouseEnter={() => setHoverStars(num)}
        onMouseLeave={() => setHoverStars(0)}
      >
        ★
      </span>
    ));
  };

  if (!review) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Your Review</h2>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="d-flex justify-content-center align-items-center">
          <div className="star-rating mb-3">{renderInteractiveStars()}</div>
        </div>
        <div className="d-block w-50 mx-auto">
          <textarea
            className="w-75"
            id="comment"
            placeholder="Edit your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
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
      </form>
    </div>
  );
};
