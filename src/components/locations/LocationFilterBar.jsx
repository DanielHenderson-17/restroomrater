import { useState } from "react";

export const LocationFilterBar = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    setSearchTerm(value);
  };

  return (
    <div className="filter-bar">
      <input
        value={searchInput}
        onChange={handleInputChange}
        type="text"
        placeholder="Search Locations"
        className="location-search"
      />
    </div>
  );
};
