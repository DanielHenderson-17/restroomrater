import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { SideBar } from "../components/nav/SideBar.jsx";
import { LocationList } from "../components/locations/LocationList";
import { MyReviews } from "../components/reviews/MyReviews";
import { getAllLocations } from "../services/locationService.jsx";
import { Map } from "../components/map/Map.jsx"; 
import { Location } from "../components/locations/Location"; 
import { EditReview } from "../components/reviews/EditReview.jsx";
import { ReviewLocation } from "../components/reviews/ReviewLocation.jsx";

import "./main.css";

export const ApplicationViews = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("rr_user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    getAllLocations().then((fetchedLocations) => {
      setLocations(fetchedLocations);
    });
  }, []);

  const updateLocations = (updatedLocations) => {
    setLocations(updatedLocations);
  };

  const onMyReviewsClick = () => {
    navigate("/my-reviews");
  };

  return (
    <div className="main-container d-flex h-100">

      <NavBar
        onSearchClick={() => navigate("/locations")}
        onMyReviewsClick={onMyReviewsClick}
        setSearchResults={setSearchResults}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
      />
      <SideBar />
      
      {/* Always display LocationList */}
      <LocationList
        locations={locations}
        searchTerm={searchTerm}
        currentUser={currentUser}
      />

      {/* Main content area for other routes */}
      <div className="content-container d-flex ms-3 justify-content-center my-auto align-items-center rounded-3 scrollbar-hide">
        <Routes>
          {/* Display Location Details */}
          <Route
            path="/locations/:locationId"
            element={<Location currentUser={currentUser} />}
          />
          <Route
            path="/my-reviews"
            element={
              <MyReviews currentUser={currentUser} locations={locations} />
            }
          />
         <Route
            path="/locations/:locationId/edit/:reviewId"
            element={
              <EditReview
                currentUser={currentUser}
                updateLocations={updateLocations}
              />
            }
          />
          <Route
            path="/locations/:locationId/rate"
            element={
              <ReviewLocation
                currentUser={currentUser}
                updateLocations={updateLocations}
              />
            }
          />
        </Routes>
      </div>
      <Map searchResults={searchResults} />
    </div>
  );
};
