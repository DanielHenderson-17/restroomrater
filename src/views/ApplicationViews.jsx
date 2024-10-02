import { useState, useEffect, useRef } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
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
import { NewReview } from "../components/reviews/NewReview.jsx";

export const ApplicationViews = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const clearMarkersRef = useRef(null);  // useRef to store the clearMarkers function from Map

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

  // Clear search results and map markers when navigating to the home route
  useEffect(() => {
    if (location.pathname === "/") {
      setSearchResults([]); // Clear search results
      if (clearMarkersRef.current) {
        clearMarkersRef.current(); // Clear markers when navigating to home
      }
    }
  }, [location]);

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
      <LocationList
        locations={locations}
        searchTerm={searchTerm}
        currentUser={currentUser}
      />

      {/* Main content area for other routes */}
      <div className="content-container d-flex ms-3 justify-content-center my-auto align-items-center rounded-3 scrollbar-hide">
        <Routes>
          <Route path="/locations/:locationId" element={<Location currentUser={currentUser} />} />
          <Route path="/my-reviews" element={<MyReviews currentUser={currentUser} locations={locations} />} />
          <Route
            path="/locations/:locationId/edit/:reviewId"
            element={<EditReview currentUser={currentUser} updateLocations={updateLocations} />}
          />
          <Route
            path="/locations/:locationId/rate"
            element={<ReviewLocation currentUser={currentUser} updateLocations={updateLocations} />}
          />
          <Route
            path="/new-review"
            element={<NewReview currentUser={currentUser} getAllLocations={getAllLocations} setLocations={setLocations} clearMarkers={() => clearMarkersRef.current && clearMarkersRef.current()} />}
          />
        </Routes>
      </div>
      <Map searchResults={searchResults} setClearMarkers={(fn) => (clearMarkersRef.current = fn)} />
    </div>
  );
};
