import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectUSState from "react-select-us-states";
import { addLocationAndRating } from "../../services/locationService.jsx";
import { Stars } from "../shared/Stars.jsx";

export const NewReview = ({ currentUser }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newLocation = {
      name,
      address,
      city,
      state,
      imgUrl,
    };

    const newRating = {
      userId: currentUser.id,
      comment,
      stars,
    };

    addLocationAndRating(newLocation, newRating).then(() => {
      navigate("/locations");
    });
  };

  const handleStarClick = (rating) => {
    setStars(rating);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="border card col-6 mx-auto">
        <h2 className="text-center my-3">New Review</h2>
        <input
          className="d-block mx-auto my-2 w-75"
          type="text"
          placeholder="Location Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="d-block mx-auto my-2 w-75"
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          className="d-block mx-auto my-2 w-75"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <div className="d-block mx-auto my-2 w-75">
          <SelectUSState
            className="select-state w-100"
            onChange={setState}
            placeholder="Select State"
          />
        </div>
        <input
          className="d-block mx-auto my-2 w-75"
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
        <div className="d-block mx-auto my-2 text-center fs-1">
          <Stars stars={stars} onClick={handleStarClick} />
        </div>
        <textarea
          className="d-block mx-auto my-2 w-75 new-rating-text-area"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="mx-auto w-75 text-end my-3">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
