import { useContext } from "react";
import "./navbar.css";
import { FaSearch, FaSignInAlt, FaUser } from "react-icons/fa";
import { RiDashboardLine, RiLogoutBoxRLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
export default function Navbar() {
  const navigate = useNavigate();
  const {
    setDisplayLoginPopup,
    baseUrl,
    userLoggedIn,
    setUserLoggedIn,
    setAcceptedProjects,
  } = useContext(AppContext);

  const [searchWord, setSearchWord] = useState("");
  const navClickHandler = () => {
    document.body.classList.add("no-scroll");
    setDisplayLoginPopup(true);
  };
  const location = useLocation().pathname;

  const getSearchItems = async () => {
    const response = await axios.get(
      baseUrl + `/api/user/search?search=${searchWord}`
    );
    if (response.data.success) {
      setAcceptedProjects(response.data.projects);
    } else {
      console.log(response.data.message);
    }

    setSearchWord("");
  };
  const logOutHandler = () => {
    setUserLoggedIn({});
    localStorage.removeItem("userDetails");
  };

  return (
    <nav>
      <div className="nav__left" onClick={() => navigate("/")}>
        Open ML Board
      </div>

      {location === "/" && (
        <div className="nav__center">
          <input
            type="text"
            id="search"
            placeholder="Image Classification"
            onChange={(e) => setSearchWord(e.target.value)}
            value={searchWord}
          />
          <button>
            <FaSearch onClick={getSearchItems} />{" "}
          </button>
        </div>
      )}

      <div className="nav__right">
        {!userLoggedIn?.token ? (
          <button className="nav__log-in" onClick={navClickHandler}>
            Log In <FaUser />
          </button>
        ) : (
          <span>{userLoggedIn?.user?.name}</span>
        )}
        <div className="nav__dropdown">
          <span
            className="nav__dashboard"
            onClick={() => navigate("/dashboard/add-posts")}
          >
            <RiDashboardLine /> Dashboard
          </span>
          <span className="nav__log-out" onClick={logOutHandler}>
            <RiLogoutBoxRLine /> LogOut
          </span>
        </div>
        {/*<button className='nav__sign-in'>Sign In  <FaSignInAlt /></button> */}
      </div>
    </nav>
  );
}
