import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./dashboard.css";
import { BsPerson } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const {pathname} = useLocation()

  const {
    dashboardOption,
    setDashboardOption,
    userLoggedIn,
    getPendingProjects,
    getUserProjects,
  } = useContext(AppContext);

  const onClickHandler = (option) => {
    setDashboardOption(option);

    if (option === "review-posts") {
      getPendingProjects();
    } else if (option === "view-posts") {
      getUserProjects();
    }

    navigate(`/dashboard/${option}`);
  };

  useEffect(() => {
    //to reach the same path after reload
    const destination = pathname.split('/')[2]
    setDashboardOption(destination)
    if (destination === "review-posts") {
      getPendingProjects();
    } else if (destination === "view-posts") {
      getUserProjects();
    }
  },[])

  return (
    <div className="dashboard">
      <div className="dashboard__left">
        <ul className="dashboard__list">
          <li
            onClick={() => onClickHandler("add-posts")}
            className={`${
              dashboardOption === "add-posts" ? "dashboard__active" : ""
            }`}
          >
            Add Posts
          </li>
          <li
            onClick={() => onClickHandler("view-posts")}
            className={`${
              dashboardOption === "view-posts" ? "dashboard__active" : ""
            }`}
          >
            View Posts
          </li>
          {userLoggedIn?.user?.email === "viswajith5749@gmail.com" && (
            <li
              onClick={() => onClickHandler("review-posts")}
              className={`${
                dashboardOption === "review-posts" ? "dashboard__active" : ""
              }`}
            >
              Review Posts
            </li>
          )}
          <li
            onClick={() => onClickHandler("edit-profile")}
            className={`${
              dashboardOption === "edit-profile" ? "dashboard__active" : ""
            }`}
          >
            Edit Profile
          </li>
        </ul>
        <span className="dashboard__owner">
      {userLoggedIn?.user?.name}
        </span>
      </div>
      <div className="dashboard__right">
        <Outlet />
      </div>
    </div>
  );
}
