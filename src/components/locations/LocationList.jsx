import { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Stars } from "../shared/Stars.jsx";
import { Location } from "./Location";

export const LocationList = ({ locations, searchTerm, currentUser }) => {
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null); // Reference for the modal

  useEffect(() => {
    setFilteredLocations(
      locations.filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, locations]);

  const handleCardClick = (locationId) => {
    setSelectedLocationId(locationId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLocationId(null);
  };

  // Define the calculateAverageRating function at the top of the file
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    return (total / ratings.length).toFixed(1); // Rounded to one decimal place
  };

  // Detect clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="location-list pt-5 w-100">
      <div className="location-cards mt-5">
        <h5 className="ms-4">Locations</h5>
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="location-card h-100 py-2 d-flex justify-content-between align-items-center"
            onClick={() => handleCardClick(location.id)}
          >
            <div className="text-start ms-4 mt-2">
              <h6 className="mb-0 text-black-90">{location.name}</h6>
              <div className="rating-stars d-flex justify-content-start align-items-center">
                <p className="average-rating me-1 amount my-0 fs-6">
                  {calculateAverageRating(location.ratings)}
                </p>
                <Stars ratings={location.ratings} />
                <p className="amount ms-2 my-0 fs-6">
                  ({location.ratings.length})
                </p>
              </div>
              <p>
                {location.address}, {location.city}, {location.state}
              </p>
            </div>
            <div className="btn rate-btn review-btn me-5 border d-flex justify-content-center align-items-center">
              <i className="bi bi-pencil-square"></i>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="md"
        backdrop={false}
        className="location-modal w-100 p-0 m-0"
      >
        <div className="close-button-container">
          <button
            type="button"
            className="close-button"
            onClick={handleCloseModal}
          >
            &times;
          </button>
        </div>
        <Modal.Body ref={modalRef} className="p-0 m-0">
          {selectedLocationId && (
            <Location
              currentUser={currentUser}
              locationId={selectedLocationId}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

