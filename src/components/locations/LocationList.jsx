import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stars } from "../shared/Stars.jsx";
import { calculateAverageRating } from "../../utils/calculateAverageRating.js";

export const LocationList = ({ locations, searchTerm }) => {
  const [filteredLocations, setFilteredLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, locations]);

  const handleCardClick = (locationId) => {
    navigate(`/locations/${locationId}`);
  };

  return (
    <div className="location-list pt-5 w-25 ms-5">
      <div className="location-cards mt-5 ms-3">
        <h5 className="ms-4">Locations</h5>
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="location-card h-100 py-2 d-flex justify-content-between align-items-center"
            onClick={() => handleCardClick(location.id)}
          >
            <div className="text-start ms-4 mt-2">
              <h6 className="mb-0 text-black-90">{location.name}</h6>
              <div className="rating-stars d-flex justify-content-start align-items-center">
                <p className="average-rating me-1 amount my-0 fs-6">
                  {calculateAverageRating(location.ratings)}
                </p>
                <Stars ratings={location.ratings} />
                <p className="amount ms-2 my-0 fs-6">
                  ({location.ratings.length})
                </p>
              </div>
              <p>
                {location.address}, {location.city}, {location.state}
              </p>
            </div>
            <div className="btn rate-btn review-btn me-5 border d-flex justify-content-center align-items-center">
              <i className="bi bi-pencil-square"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
