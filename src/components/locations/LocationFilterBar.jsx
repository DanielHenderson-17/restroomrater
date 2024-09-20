export const LocationFilterBar = ({ setSearchTerm }) => {
  return (
    <div className="filter-bar">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Locations"
        className="location-search"
      />
    </div>
  );
};
