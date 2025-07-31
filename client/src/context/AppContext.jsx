import axios from "axios";
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [currentState, setCurrentState] = useState("log-in");
  const [displayLoginPopup, setDisplayLoginPopup] = useState(false);
  const [userDetails, setUserDetails] = useState({}); //fot the login pop up
  const baseUrl = "http://localhost:5000";
  const [dashboardOption, setDashboardOption] = useState("add-posts");
  const [editProject, setEditProject] = useState({ type: "edit" });
  const [userLoggedIn, setUserLoggedIn] = useState({});
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [projectDetails, setProjectDetails] = useState({});
  const [authorDetails, setAuthorDetails] = useState({});
  const [userProjects, setUserProjects] = useState([]);

  const fetchAllProjects = async () => {
    //fetching all accepted projects
    const response = await axios.get(baseUrl + "/api/projects/get-projects");
    if (response.data.success) {
      setAcceptedProjects(response.data.projects);
    }
  };

  const getUserProjects = async () => {
    const response = await axios.get(
      baseUrl + "/api/projects/get-user-projects",
      { headers: { token: userLoggedIn.token } }
    );
    if (response.data.success) {
      setUserProjects(response.data.userProjects);
    } else {
      console.log(response.data.message);
    }
  };

  const getPendingProjects = async () => {
    const response = await axios.get(
      baseUrl + "/api/admin/get-pending-projects"
    );
    if (response.data.success) {
      setPendingProjects(response.data.pendingProjects);
    }
  };

  const getAuthorDetails = async (id) => {
    const response = await axios.post(
      baseUrl + "/api/user/get-author-details",
      { authorId: id }
    );

    if (response.data.success) {
      setAuthorDetails(response.data.authorDetails);
    } else {
      console.log(response.data.message);
    }
  };

  const getProjectDetails = async (projectId) => {
    const response = await axios.post(
      baseUrl + "/api/projects/get-project-details",
      { projectId }
    );
    if (response.data.success) {
      setProjectDetails(response.data.projectDetails);
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      setUserLoggedIn(JSON.parse(localStorage.getItem("userDetails")));
    }
    fetchAllProjects();
  }, []);

  const value = {
    currentState,
    setCurrentState,
    fetchAllProjects,
    displayLoginPopup,
    setDisplayLoginPopup,
    userDetails,
    setUserDetails,
    baseUrl,
    dashboardOption,
    setDashboardOption,
    editProject,
    setEditProject,
    userLoggedIn,
    setUserLoggedIn,
    getPendingProjects,
    pendingProjects,
    acceptedProjects,
    setAcceptedProjects,
    projectDetails,
    setProjectDetails,
    getAuthorDetails,
    authorDetails,
    setAuthorDetails,
    getUserProjects,
    userProjects,
    getProjectDetails,
    projectId,
    setProjectId,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
