import { useNavigate } from "react-router-dom";
import "./viewUser.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function ViewUser() {
  const navigate = useNavigate();
  const { authorDetails, setProjectDetails } = useContext(AppContext);

  const onClickHandler = (project, author) => {
    navigate(`/about/${project._id}`);
    setProjectDetails(project);
    setProjectDetails((prev) => ({ ...prev, createdBy: { name: author } }));
  };
  
  return (
    <div className="view-user">
      <div className="user__profile">
        <span>
          {authorDetails?.author ? authorDetails.author.name : "dummy"}
        </span>
        <span>
          {authorDetails?.author
            ? authorDetails.author.email
            : "dummy@gmail.com"}
        </span>
        <a href="#">
          {authorDetails?.author ? authorDetails.author.url : "Know Me More"}
        </a>
      </div>
      <div className="user__contributions">
        {authorDetails?.projects ? (
          authorDetails.projects.map((project, indx) => (
            <div
              key={indx}
              className="user__contribution"
              onClick={() => onClickHandler(project, authorDetails.author.name)}
            >
              <span>{project.name}</span>
              <p>{project.description}</p>
            </div>
          ))
        ) : (
          <div
            className="user__contribution"
            onClick={() => navigate("/about/12")}
          >
            <span>Project Name</span>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo
              dignissimos quaerat incidunt voluptatibus voluptatem fugit nisi
              ratione molestias optio corrupti? Aut numquam error voluptatibus?
              Debitis natus assumenda vitae deserunt cupiditate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
