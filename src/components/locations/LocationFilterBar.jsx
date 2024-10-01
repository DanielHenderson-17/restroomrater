import { useState } from "react";

export const LocationFilterBar = ({ setSearchTerm, onSearchClick }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchTerm(value); 
  };

  const handleFocus = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  const handleClearClick = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="rounded-pill shadow col-11 filter-bar form-control ps-4"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      {inputValue && (
        <button
          type="button"
          className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3"
          onClick={handleClearClick}
          style={{ textDecoration: 'none' }}
        >
          &times;
        </button>
      )}
    </div>
  );
};