import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLocations } from "../../services/locationService.jsx";
import "./Locations.css";
import { LocationFilterBar } from "./LocationFilterBar.jsx";
import { Stars } from "../shared/Stars.jsx";

export const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllLocations().then((fetchedLocations) => {
      setLocations(fetchedLocations);
      setFilteredLocations(fetchedLocations);
    });
  }, []);

  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, locations]);

  const handleCardClick = (id) => {
    navigate(`/locations/${id}`);
  };

  const handleNewRatingClick = () => {
    navigate("/locations/new-rating");
  };

  return (
    <div className="location-list">
      <h1>All Locations & Reviews</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-9">
          <LocationFilterBar setSearchTerm={setSearchTerm} />
        </div>

        <button
          className="btn btn-primary my-3 p-1 col-2"
          onClick={handleNewRatingClick}
        >
          New
        </button>
      </div>

      <div className="location-cards">
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="location-card"
            onClick={() => handleCardClick(location.id)}
          >
            <img
              src={
                location.imgUrl
                  ? location.imgUrl
                  : "https://via.placeholder.com/80"
              }
              alt={`${location.name}`}
              className="location-image"
            />
            <div className="location-details2">
              <h5>{location.name}</h5>
              <p>{location.address}</p>
              <p>
                {location.city}, {location.state}
              </p>
              <div className="ratings">
                <div className="rating-stars d-flex justify-content-center">
                  <Stars ratings={location.ratings} />
                  <p className="amount ms-2">({location.ratings.length})</p>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
