import { Route, Routes, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllLocations } from "../services/locationService.jsx";
import { LocationList } from "../components/locations/LocationList.jsx";
import { Location } from "../components/locations/Location.jsx";
import { NavBar } from "../components/nav/NavBar.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { RateLocation } from "../components/locations/RateLocation.jsx";
import { EditReview } from "../components/locations/EditReview.jsx";
import { NewRating } from "../components/locations/NewRating.jsx";
import { MyRatings } from "../components/locations/MyRatings.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [locations, setLocations] = useState([]);

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
        <Route path="/locations" element={<LocationList locations={locations} />} />
        <Route
          path="/locations/:locationId"
          element={<Location currentUser={currentUser} locations={locations} />}
        />
        <Route
          path="/locations/:locationId/rate"
          element={
            <RateLocation
              currentUser={currentUser}
              locations={locations}
              updateLocations={updateLocations}
            />
          }
        />
        <Route
          path="/locations/:locationId/edit/:reviewId"
          element={<EditReview currentUser={currentUser} locations={locations} updateLocations={updateLocations} />}
        />
        <Route
          path="/locations/new-rating"
          element={<NewRating currentUser={currentUser} updateLocations={updateLocations} />}
        />
        <Route
          path="/my-ratings"
          element={<MyRatings currentUser={currentUser} locations={locations} />}
        />
      </Route>
    </Routes>
  );
};
