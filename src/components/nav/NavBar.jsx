import "./NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <li className="navbar-item">
        <Link to="/">
          <img
            className="navbar-image"
            src="https://i.imgur.com/Mpo9h6p.png"
            alt=""
          />
        </Link>
      </li>

      <ul className="navbar">
        <li className="navbar-item">
          <Link to="/locations">All Rates</Link>
        </li>
        <li className="navbar-item">
          <Link to="/my-ratings">My Ratings</Link>
        </li>
        <li className="navbar-item">
          <Link to="/patrons">Patrons</Link>
        </li>
        {localStorage.getItem("rr_user") ? (
            <li className="navbar-item navbar-logout">
              <Link
                className="navbar-link"
                to=""
                onClick={() => {
                  localStorage.removeItem("rr_user");
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            ""
          )}
      </ul>
    </nav>
  );
};
