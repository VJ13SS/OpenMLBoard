import { FaPencilAlt } from "react-icons/fa";
import "./project.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

export default function Project({ project }) {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { baseUrl,setDashboardOption, setEditProject, getAuthorDetails,deleteProject } = useContext(AppContext);

  const onClickHandler = () => {
    //to edit the project
    setDashboardOption("add-posts");
    setEditProject(project);
    navigate("/dashboard/add-posts");
  };

  const authorClickHandler = async (id) => {
    getAuthorDetails(id);
    navigate(`/view-user/${id}`);
  };

  const changeProjectVisibility = async (display) => {

    const response = await axios.post(baseUrl + '/api/user/change-project-visibility',{projectId:project._id,visible:display})
    console.log(response.data.message)
  }

  return (
    <div className="project">
      <h2>
        {project?.name ? project.name : "Project Name"}{" "}
        {location === "/dashboard/view-posts" && (
          <div className="project__menu">
            <BsThreeDotsVertical />
            <div className="project__drop-down">
              <span onClick={onClickHandler} style={{color:'goldenrod'}}>Edit</span>
              <span style={{color:'black'}} onClick={()=>changeProjectVisibility(project.visible ? false:true)}>{project.visible ? 'Hide':'Show'}</span>
              <span style={{color:'red'}} onClick={() => deleteProject(project._id)}>Delete</span>
              
            </div>
            
          </div>
          
          
        )}
      </h2>
      <p>
        {project?.description
          ? project.description
          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ametperferendis corporis ullam rerum reprehenderit expedita molestiae tenetur aut, vero voluptates nisi quae delectus placeat, recusandae optio. Tempora sit beatae incidunt!"}
      </p>
      <span>
        Level :{" "}
        <span
          className={project?.category ? `${project.category}` : "Intermediate"}
        >
          {project?.category ? project.category : "Intermediate"}
        </span>
      </span>
      <span>
        Created By :{" "}
        <span
          className="project__owner"
          onClick={() =>
            authorClickHandler(
              project?.createdBy?._id ? project.createdBy._id : "12"
            )
          }
        >
          {project?.createdBy?.name ? project.createdBy.name : "Author Name"}
        </span>
      </span>

      <div className="project__links">
        <span> Project Links</span>
        {project?.links ? (
          project.links.map((link, indx) => (
            <a href="#" key={indx}>
              {link}{" "}
            </a>
          ))
        ) : (
          <a href="#">Link Type : Link </a>
        )}
      </div>
      <span className={project?.status ? `${project.status}` : "Pending"}>
        {project?.status ? project.status : "Pending"}
      </span>
      {location === "/dashboard/view-posts" && (
          <span className={project?.status ? `${project.status}` : "Pending"}>
        {project?.message ? project.message : "We are evaluating your project"}
      </span>
        )}
      
    </div>
  );
}
