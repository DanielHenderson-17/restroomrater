import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLocationAndRating } from "../../services/locationService.jsx";

export const NewRating = ({ currentUser }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = {
      name,
      address,
      city,
      state,
      imgUrl,
    };

    const newRating = {
      stars,
      comment,
      userId: currentUser.id,
      date: new Date().toISOString(),
    };

    addLocationAndRating(newLocation, newRating).then(() => {
      navigate("/locations");
    });
  };

  const renderInteractiveStars = () => {
    const starsArray = [1, 2, 3, 4, 5];
    return starsArray.map((num) => (
      <span
        key={num}
        style={{
          fontSize: "40px",
          color: num <= stars ? "#ffd700" : "#d3d3d3",
          cursor: "pointer",
        }}
        onClick={() => setStars(num)}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="border card col-6 mx-auto">
        <h2 className="text-center my-3">New Rating</h2>
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
        <input
          className="d-block mx-auto my-2 w-75"
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <input
          className="d-block mx-auto my-2 my-2 w-75"
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <div className="d-block mx-auto my-2 my-2 text-center">
          {renderInteractiveStars()}
        </div>

        <textarea
          className="d-block mx-auto my-2 my-2 w-75 new-rating-text-area"
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
