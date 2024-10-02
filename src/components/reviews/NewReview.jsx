import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { addLocationAndRating } from "../../services/locationService.jsx";
import { Stars } from "../shared/Stars.jsx";
import { motion } from "framer-motion";

export const NewReview = ({
  currentUser,
  setLocations,
  getAllLocations,
  clearMarkers,
}) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, address, imgUrl, lat, lng } = state || {};

  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newLocation = { name, address, imgUrl };
    const newRating = {
      userId: currentUser.id,
      comment,
      stars,
      date: new Date().toISOString(),
    };

    addLocationAndRating(newLocation, newRating).then(() => {
      new window.google.maps.Marker({
        position: { lat, lng },
        map: window.currentMapInstance,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      });

      window.alert("Your review has been submitted");
      clearMarkers();
      navigate("/my-reviews");
      getAllLocations().then((fetchedLocations) => {
        setLocations(fetchedLocations);
      });
    });
  };

  const handleCloseClick = () => {
    navigate("/");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="border card col-6 mx-auto w-100 h-100 p-0 position-relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bootstrap Close Button inside the form container */}
      <button
        type="button"
        className="btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close"
        onClick={handleCloseClick}
      ></button>

      {imgUrl && (
        <div className="image-container mx-auto w-100 d-flex justify-content-center">
          <img src={imgUrl} alt={name} className="new-img w-100" />
        </div>
      )}
      <h3 className="text-center mt-3">{name}</h3>
      <p className="text-center">{address}</p>
      <div className="mx-auto mt-3 new-stars">
        <Stars
          stars={stars}
          onClick={setStars}
          className="d-block mx-auto my-2 text-center"
        />
      </div>

      <textarea
        className="d-block mx-auto my-2 w-75 new-comment"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="d-flex justify-content-end me-2 mt-3">
        <button type="button" className="btn btn-danger" onClick={handleCloseClick}>
          Cancel
        </button>
        <button type="submit" className="btn btn-success ms-3 me-5">
          Post
        </button>
      </div>
    </motion.form>
  );
};
