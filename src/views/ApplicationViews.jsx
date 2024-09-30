import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar.jsx";
import { SideBar } from "../components/nav/SideBar.jsx";
import { LocationList } from "../components/locations/LocationList";
import { MyReviews } from "../components/reviews/MyReviews";
import { getAllLocations } from "../services/locationService.jsx";
import { Map } from "../components/map/Map.jsx"; 

import "./main.css";

export const ApplicationViews = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [locations, setLocations] = useState([]);
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

  return (
    <div className="main-container d-flex h-100">
      <Map />
      <NavBar
        onSearchClick={() => navigate("/locations")}
        onMyReviewsClick={() => navigate("/my-reviews")}
        setSearchTerm={setSearchTerm}
      />
      <SideBar />
      <div className="content-container d-flex ms-5">
        <Routes>
          <Route
            path="/locations"
            element={
              <LocationList
                locations={locations}
                searchTerm={searchTerm}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/my-reviews"
            element={
              <MyReviews currentUser={currentUser} locations={locations} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default ApplicationViews;
