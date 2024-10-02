import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { searchGooglePlaces } from "../../services/locationService";
import { getAllUsers } from "../../services/userService";
import "./NavBar.css";

export const NavBar = ({ onMyReviewsClick, setSearchResults, currentUser }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers().then((fetchedUsers) => {
      const filteredUsers = fetchedUsers.filter(
        (user) => user.id !== currentUser?.id
      );
      setUsers(filteredUsers);
    });
  }, [currentUser]);

  // Handle the search input and call Google Places API on Enter key press
  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && searchTerm.trim().length > 0) {
      try {
        const results = await searchGooglePlaces(searchTerm); // Adjusted to Google Places
        setSearchResults(results); // Pass the results to the map to show markers
      } catch (error) {
        console.error("Error searching Google Places:", error);
      }
    }
  };

  const handleAccountSwitch = (email) => {
    // Log out the current user
    localStorage.removeItem("rr_user");

    // Navigate to the login page with the selected user's email as state
    navigate("/login", { state: { email } });
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top mt-2">
      <div className="container-fluid">
        <div className="col-3">
          <input
            type="text"
            className="form-control rounded-pill shadow"
            placeholder="Search for locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress} // Trigger search on Enter key
          />
        </div>

        <div className="collapse navbar-collapse justify-content-start col-3 ms-4">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="btn border-0 rounded-pill me-2 shadow"
                onClick={onMyReviewsClick}
              >
                <i className="bi bi-person me-1"></i>My Reviews
              </button>
            </li>
          </ul>
        </div>

        <div className="d-flex">
          <div className="dropdown">
            <img
              src={currentUser?.imgUrl || "https://i.imgur.com/8Km9tLL.png"}
              alt="User"
              className="rounded-circle dropdown-toggle shadow"
              width="40"
              height="40"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            />

            <ul
              className="dropdown-menu dropdown-menu-end main-menu rounded-4"
              aria-labelledby="userDropdown"
            >
              <div className="dropdown-header d-flex justify-content-end align-items-center">
                <p className="small my-0 me-5 fw-bold">
                  {currentUser?.email || "user@example.com"}
                </p>
                <button
                  type="button"
                  className="btn-close ms-5 ps-3"
                  aria-label="Close"
                ></button>
              </div>

              <div className="user-info text-center my-3">
                <img
                  src={currentUser?.imgUrl || "https://i.imgur.com/8Km9tLL.png"}
                  alt="User"
                  className="rounded-circle mb-2 avatar-2-img shadow"
                />
                <p className="mb-0">Hi, {currentUser?.name || "User"}</p>
              </div>
              <div className="other-accounts mx-3 border rounded-4 mb-5">
                <h5 className="pt-2 ps-4 pb-1 fs-6">more accounts</h5>
                {users.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="d-flex align-items-center other-account w-100 p-1 ps-3"
                      onClick={() => handleAccountSwitch(user.email)} // Handle account switch
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={user.imgUrl || "https://i.imgur.com/8Km9tLL.png"}
                        alt="Other user"
                        className="rounded-circle me-2 shadow"
                        width="35"
                        height="35"
                      />
                      <div>
                        <p className="mb-0">{user.name}</p>
                        <p className="small text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="small text-muted text-center">
                    No additional accounts
                  </p>
                )}
              </div>

              <li>
                <Link
                  className="dropdown-item text-end pe-4 d-flex justify-content-end align-items-center logout"
                  to=""
                  onClick={() => {
                    localStorage.removeItem("rr_user");
                    navigate("/", { replace: true });
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2 fs-4"></i>
                  <span className="logout-btn">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
