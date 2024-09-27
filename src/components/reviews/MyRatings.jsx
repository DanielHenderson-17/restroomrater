import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stars } from "../shared/Stars.jsx"; // Reuse Stars component

export const MyRatings = ({ currentUser, locations }) => {
  const navigate = useNavigate();
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    if (currentUser && locations) {
      const userLocations = locations.filter((location) =>
        location.ratings.some((rating) => rating.userId === currentUser.id)
      );
      setFilteredLocations(userLocations);
    }
  }, [locations, currentUser]);

  return (
    <div className="my-ratings mt-5 pt-5">
      <div className="text-center mb-5">
        {currentUser && (
          <>
            <img
              src={currentUser.imgUrl || "https://via.placeholder.com/100"}
              alt={currentUser.name}
              className="user-avatar rounded-circle mb-2"
              style={{ width: "100px" }}
            />
            <h2>{currentUser.name}</h2>
          </>
        )}
      </div>
      <div className="row w-75 mx-auto">
        {filteredLocations.map((location) => {
          const userRating = location.ratings.find(
            (rating) => rating.userId === currentUser.id
          );
          return (
            <div className="col-3 mb-4 mx-auto" key={location.id}>
              <div className="card h-100 w-100">
                <div className="d-flex justify-content-between align-items-center border-bottom">
                  <img
                    src={location.imgUrl || "https://via.placeholder.com/80"}
                    alt={location.name}
                    className="location-image col-12 h-100"
                  />
                  <div className="ms-3 col-5 text-center pt-3">
                    <div className="info-height"><h5>{location.name}</h5>
                    <p>
                      {location.city}, {location.state}
                    </p></div>
                    
                    <div className="justify-content-center align-items-center d-flex">
                      <div className="rating-stars mb-0 d-flex">
                        {/* Use the Stars component */}
                        <Stars stars={userRating.stars} />
                      </div>
                      <p className="mb-0 mt-1 ms-2">
                        {new Date(userRating.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="dropdown align-self-start col-1">
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
                            navigate(`/locations/${location.id}/edit/${userRating.id}`)
                          }
                        >
                          Edit
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 m-3 p-2 h-100">
                  <p>{userRating.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
