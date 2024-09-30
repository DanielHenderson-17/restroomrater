import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stars } from "../shared/Stars.jsx";
import "./ReviewLocation.css";

export const MyReviews = ({ currentUser, locations }) => {
  const navigate = useNavigate();
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageStars, setAverageStars] = useState(0);

  useEffect(() => {
    if (currentUser && locations) {
      const userLocations = locations.filter((location) =>
        location.ratings.some((rating) => rating.userId === currentUser.id)
      );
      setFilteredLocations(userLocations);

      const totalRatings = userLocations.reduce((acc, location) => {
        return acc + location.ratings.filter((rating) => rating.userId === currentUser.id).length;
      }, 0);
      setTotalReviews(totalRatings);

      const totalStars = userLocations.reduce((acc, location) => {
        const userRating = location.ratings.find((rating) => rating.userId === currentUser.id);
        return acc + (userRating ? userRating.stars : 0);
      }, 0);

      const avgStars = totalRatings > 0 ? totalStars / totalRatings : 0;
      setAverageStars(avgStars);
    }
  }, [locations, currentUser]);

  return (
    <div className="my-ratings pt-5 w-100">
      <div className="text-center mb-5 mt-5">
        {currentUser && (
          <>
            <img
              src={currentUser.imgUrl || "https://via.placeholder.com/100"}
              alt={currentUser.name}
              className="user-avatar rounded-circle mb-2"
              style={{ width: "100px" }}
            />
            <h2>{currentUser.name}</h2>
            <div className="mt-3">
              <Stars stars={averageStars} />
              <div>
                <span>{averageStars.toFixed(1)} ({totalReviews} reviews)</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="">
        {filteredLocations.map((location) => {
          const userRating = location.ratings.find(
            (rating) => rating.userId === currentUser.id
          );
          return (
            <div className="col-12 mb-0 mx-auto" key={location.id}>
              <div className="review-card h-100 col-12">
                <div className="mx-auto">
                  <img
                    src={location.imgUrl || "https://via.placeholder.com/80"}
                    alt={location.name}
                    className="location-image h-100 w-100"
                  />
                  <div className="text-center pt-3 ms-3">
                    <div className="border-bottom">
                      <div className="ms-3 d-flex justify-content-between align-items-end">
                        <h5 className="text-start mb-0">{location.name}</h5>
                        <div className="dropdown align-self-start col-1 me-3">
                          <span
                            className="dropdown-toggle"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                              fontSize: "24px",
                              cursor: "pointer",
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            ⋮
                          </span>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() =>
                                  navigate(
                                    `/locations/${location.id}/edit/${userRating.id}`
                                  )
                                }
                              >
                                Edit
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-start my-0 ms-3">{location.address}</p>
                      <p className="text-start mt-0 mb-2 ms-3">
                        {location.city}, {location.state}
                      </p>
                      <div className="rating-stars mb-0 d-flex align-items-center ms-3">
                        <div className="amount me-2 fs-6">
                          {userRating.stars.toFixed(1)}
                        </div>
                        <Stars stars={userRating.stars} />
                        <div className="date ms-2 fs-6">
                          {new Date(userRating.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="comment ms-3 mt-0">
                        <p className="text-start mt-0 pe-2">{userRating.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
