export const LocationFilterBar = ({ setSearchTerm, onSearchClick }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update search term in ApplicationViews
  };

  const handleFocus = () => {
    if (onSearchClick) {
      onSearchClick(); // Trigger navigation to /locations
    }
  };

  return (
    <input
      type="text"
      className="rounded-pill shadow col-11 filter-bar form-control ps-4"
      placeholder="Search..."
      onChange={handleInputChange}
      onFocus={handleFocus} // Trigger the route change when the search bar is focused
    />
  );
};

export default LocationFilterBar;
