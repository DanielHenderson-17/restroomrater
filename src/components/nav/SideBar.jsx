import { useEffect, useState } from 'react';
import './SideBar.css';
import { extractCities } from '../../utils/extractCities';

export const SideBar = ({ locations, onCityClick }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (locations.length) {
      const uniqueCities = extractCities(locations);
      setCities(uniqueCities);
    }
  }, [locations]);

  return (
    <div className="d-flex flex-column bg-light position-fixed h-100 sidebar shadow-lg">
      <nav className="nav flex-column pt-5">

        {/* "All Cities" option */}
        <a
          className="nav-link sidebar-city text-nowrap text-center"
          href="#"
          onClick={() => onCityClick(null)}  // Passing null to reset to all cities
        >
          <i className="bi bi-layers text-center fs-3"></i>
          <div>All Cities</div>
        </a>

        {/* Render the individual cities */}
        {cities.map((city, index) => (
          <a
            key={index}
            className="nav-link sidebar-city text-nowrap text-center"
            href="#"
            onClick={() => onCityClick(city)}
          >
            <i className="bi bi-layers text-center fs-3"></i>
            <div>{city}</div>
          </a>
        ))}
      </nav>
      <div className="sidebar-content flex-fill"></div>
    </div>
  );
};
