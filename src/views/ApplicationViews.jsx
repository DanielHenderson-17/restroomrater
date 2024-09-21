import { Route, Routes, Outlet } from "react-router-dom";
import { LocationList } from "../components/locations/LocationList.jsx";
import { Location } from "../components/locations/Location.jsx";
import { NavBar } from "../components/nav/NavBar.jsx";

export const ApplicationViews = () => {
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
        <Route path="/locations" element={<LocationList />} />
        <Route path="/locations/:locationId" element={<Location />} />
      </Route>
    </Routes>
  );
};
