import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { NavBar } from '../components/nav/NavBar.jsx';
import { SideBar } from '../components/nav/SideBar.jsx';
import { LocationList } from '../components/locations/LocationList';
import { MyReviews } from '../components/reviews/MyReviews';
import { getAllLocations } from "../services/locationService.jsx";
import "./main.css";

export const ApplicationViews = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

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

  // Handle search click to navigate to /locations
  const handleSearchClick = () => {
    navigate('/locations');
  };

  // Handle My Reviews click to navigate to /my-reviews
  const handleMyReviewsClick = () => {
    navigate('/my-reviews');
  };

  return (
    <div className="main-container d-flex h-100">
      {/* Pass the search term and handlers as props to NavBar */}
      <NavBar 
        onSearchClick={handleSearchClick} 
        onMyReviewsClick={handleMyReviewsClick} 
        setSearchTerm={setSearchTerm} 
      />

      {/* Static SideBar */}
      <SideBar />

      {/* Dynamic Content Area using Routes */}
      <div className="content-container d-flex ms-5">
        <Routes>
          <Route 
            path="/locations" 
            element={<LocationList locations={locations} searchTerm={searchTerm} />} 
          />
          <Route 
            path="/my-reviews" 
            element={<MyReviews currentUser={currentUser} locations={locations} />} 
          />
        </Routes>
      </div>
    </div>
  );
};

export default ApplicationViews;
