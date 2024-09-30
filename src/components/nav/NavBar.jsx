import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LocationFilterBar } from "../locations/LocationFilterBar.jsx";
import "./NavBar.css";

export const NavBar = ({ onSearchClick, onMyReviewsClick, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg fixed-top mt-2">
      <div className="container-fluid">
        <div className="col-3">
          <LocationFilterBar setSearchTerm={setSearchTerm} onSearchClick={onSearchClick} />
        </div>

        <div className="collapse navbar-collapse justify-content-start col-3 ms-4">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn border-0 rounded-pill me-2 shadow" onClick={onMyReviewsClick}>
                <i className="bi bi-person me-1"></i>My Reviews
              </button>
            </li>
          </ul>
        </div>

        <div className="d-flex">
          <div className="dropdown">
            <img
              src="https://i.imgur.com/8Km9tLL.png"
              alt="User"
              className="rounded-circle dropdown-toggle"
              width="40"
              height="40"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            />

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              {localStorage.getItem("rr_user") ? (
                <li>
                  <Link
                    className="dropdown-item"
                    to=""
                    onClick={() => {
                      localStorage.removeItem("rr_user");
                      navigate("/", { replace: true });
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
