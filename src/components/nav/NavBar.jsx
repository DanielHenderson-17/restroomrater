import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LocationFilterBar } from "../locations/LocationFilterBar.jsx";
import "./NavBar.css";

export const NavBar = ({ onSearchClick, onMyReviewsClick, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg fixed-top mt-2">
      <div className="container-fluid">
        <div className="col-3 ">
          {/* Pass setSearchTerm to LocationFilterBar */}
          <LocationFilterBar setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} />
        </div>

        <div className="collapse navbar-collapse justify-content-start col-3 ms-5">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* Trigger the display of MyReviews when this button is clicked */}
              <button className="btn border-0 rounded-pill me-2 shadow" onClick={onMyReviewsClick}>
                <i className="bi bi-person me-1"></i>My Reviews
              </button>
            </li>
          </ul>
        </div>

        <div className="d-flex">
          <img
            src="https://i.imgur.com/8Km9tLL.png"
            alt="User"
            className="rounded-circle"
            width="40"
            height="40"
          />
          {localStorage.getItem("rr_user") ? (
            <Link
              className="btn border-0 ms-2 rounded-pill logout-btn"
              to=""
              onClick={() => {
                localStorage.removeItem("rr_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};


