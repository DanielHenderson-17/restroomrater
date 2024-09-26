import { Route, Routes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { LocationList } from "../components/locations/LocationList.jsx";
import { Location } from "../components/locations/Location.jsx";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { RateLocation } from "../components/locations/RateLocation.jsx";
import { EditReview } from "../components/locations/EditReview.jsx";
import { NewRating } from "../components/locations/NewRating.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Retrieve the logged-in user from 'rr_user' in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("rr_user"));
    if (storedUser) {
      setCurrentUser(storedUser); // Set the user from localStorage
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="/locations" element={<LocationList />} />
        <Route
          path="/locations/:locationId"
          element={<Location currentUser={currentUser} />}
        />
        <Route
          path="/locations/:locationId/rate"
          element={<RateLocation currentUser={currentUser} />}
        />
        <Route
          path="/locations/:locationId/edit/:reviewId"
          element={<EditReview currentUser={currentUser} />}
        />
        <Route path="/locations/new-rating" element={<NewRating currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};
