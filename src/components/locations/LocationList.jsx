import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Locations.css";
import { Stars } from "../shared/Stars.jsx";

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

  const handleCardClick = (id) => {
    navigate(`/locations/${id}`);
  };

  // Helper function to calculate the average rating for a location
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    return (total / ratings.length).toFixed(1); // Rounded to one decimal place
  };

  return (
    <div className="location-list pt-5 w-100">
      <h1 className="text-center mt-5 mb-3">All Locations</h1>

      <div className="location-cards">
        {filteredLocations.map((location) => {
          const averageRating = calculateAverageRating(location.ratings);

          return (
            <div
              key={location.id}
              className="location-card h-100"
              onClick={() => handleCardClick(location.id)}
            >
              <img
                src={location.imgUrl || "https://via.placeholder.com/80"}
                alt={location.name}
                className="location-image w-100"
              />
              <div className="text-start ms-5 mt-2">
                <h5 className="mb-0">{location.name}</h5>
                <div className="rating-stars d-flex justify-content-start">
                  {/* Display the average rating */}
                  <p className="average-rating me-1 amount my-0">{averageRating}</p>
                  <Stars ratings={location.ratings} />
                  <p className="amount ms-2 my-0">({location.ratings.length})</p>
                </div>
                <p>{location.address}, {location.city}, {location.state}</p>
                <p>
                  
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationList;
