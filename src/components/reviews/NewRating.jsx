import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { addLocationAndRating } from "../../services/locationService.jsx";

const stateOptions = [
  { value: "AL", label: "AL" },
  { value: "AK", label: "AK" },
  { value: "AZ", label: "AZ" },
  { value: "AR", label: "AR" },
  { value: "CA", label: "CA" },
  { value: "CO", label: "CO" },
  { value: "CT", label: "CT" },
  { value: "DE", label: "DE" },
  { value: "FL", label: "FL" },
  { value: "GA", label: "GA" },
  { value: "HI", label: "HI" },
  { value: "ID", label: "ID" },
  { value: "IL", label: "IL" },
  { value: "IN", label: "IN" },
  { value: "IA", label: "IA" },
  { value: "KS", label: "KS" },
  { value: "KY", label: "KY" },
  { value: "LA", label: "LA" },
  { value: "ME", label: "ME" },
  { value: "MD", label: "MD" },
  { value: "MA", label: "MA" },
  { value: "MI", label: "MI" },
  { value: "MN", label: "MN" },
  { value: "MS", label: "MS" },
  { value: "MO", label: "MO" },
  { value: "MT", label: "MT" },
  { value: "NE", label: "NE" },
  { value: "NV", label: "NV" },
  { value: "NH", label: "NH" },
  { value: "NJ", label: "NJ" },
  { value: "NM", label: "NM" },
  { value: "NY", label: "NY" },
  { value: "NC", label: "NC" },
  { value: "ND", label: "ND" },
  { value: "OH", label: "OH" },
  { value: "OK", label: "OK" },
  { value: "OR", label: "OR" },
  { value: "PA", label: "PA" },
  { value: "RI", label: "RI" },
  { value: "SC", label: "SC" },
  { value: "SD", label: "SD" },
  { value: "TN", label: "TN" },
  { value: "TX", label: "TX" },
  { value: "UT", label: "UT" },
  { value: "VT", label: "VT" },
  { value: "VA", label: "VA" },
  { value: "WA", label: "WA" },
  { value: "WV", label: "WV" },
  { value: "WI", label: "WI" },
  { value: "WY", label: "WY" },
];

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
      state: state.value,
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
          <Select
            options={stateOptions}
            value={state}
            onChange={setState}
            placeholder="Select State"
            isClearable
          />
        </div>

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
