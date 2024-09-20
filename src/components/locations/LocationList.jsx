import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLocations } from "../../services/locationService.jsx";
import "./Locations.css";
import { LocationFilterBar } from "./LocationFilterBar.jsx";

export const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllLocations().then((fetchedLocations) => {
      setLocations(fetchedLocations);
    });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/locations/${id}`);
  };

  const filteredLocations = locations.filter((location) => {
    return location.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const totalStars = ratings.reduce(
      (total, rating) => total + rating.stars,
      0
    );
    const averageRating = totalStars / ratings.length;
    return Math.ceil(averageRating);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star empty"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="location-list">
      <h1>Bathroom Locations and Ratings</h1>
      <LocationFilterBar setSearchTerm={setSearchTerm} />
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
            <div className="location-details">
              <h2>{location.name}</h2>
              <p>{location.address}</p>
              <p>
                {location.city}, {location.state}
              </p>
              <div className="ratings">
                <p className="rating-stars">
                  {renderStars(calculateAverageRating(location.ratings))}
                </p>
                <p>({location.ratings.length})</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
