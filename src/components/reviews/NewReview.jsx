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
    const newLocation = { name, address, city, state, imgUrl };
    const newRating = { userId: currentUser.id, comment, stars };

    addLocationAndRating(newLocation, newRating).then(() => navigate("/locations"));
  };

  return (
    <form onSubmit={handleSubmit} className="border card col-6 mx-auto">
      <h2 className="text-center my-3">New Review</h2>
      <input
        className="d-block mx-auto my-2 w-75"
        placeholder="Location Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="d-block mx-auto my-2 w-75"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        className="d-block mx-auto my-2 w-75"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <SelectUSState className="d-block mx-auto my-2 w-75" onChange={setState} />
      <input
        className="d-block mx-auto my-2 w-75"
        placeholder="Image URL"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <Stars stars={stars} onClick={setStars} className="d-block mx-auto my-2 fs-1 text-center" />
      <textarea
        className="d-block mx-auto my-2 w-75"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="w-75 mx-auto text-end">
        <button type="submit" className="btn btn-success">Submit</button>
      </div>
    </form>
  );
};
