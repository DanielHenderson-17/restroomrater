import { Route, Routes } from "react-router-dom";
import { LocationList } from "../components/locations/LocationList.jsx";
import { Location } from "../components/locations/Location.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/locations" element={<LocationList />} />
      <Route path="/locations/:locationId" element={<Location />} />
    </Routes>
  );
};
