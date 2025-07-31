import { BiSmile } from "react-icons/bi";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Card({ project }) {
  const navigate = useNavigate();
  const text = "hello all how are you";
  const {setProjectId} = useContext(AppContext)
  const onClickHandler = async (projectId) => {
    setProjectId(projectId)
    navigate(`/about/${projectId}`)
  }

  return (
    <div className="card" onClick={() => onClickHandler(project._id)}>
      <h1>{project?.name ? project.name : "Project Name"}</h1>
      <p className="card__description">
        {project?.description
          ? project.description.slice(0, Math.floor(text.length / 4) * 3) + '...'
          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem eius facere sed sequi, repudiandae consequatur dolorem perferendis animi! Quod, nisi hic. Aliquam expedita enim animi voluptatibus consequatur id quisquam?"}
      </p>
      <div className="card__footer">
        <span className={project?.category ? `${project.category}` : "Intermediate"}>{project?.category ? project.category : 'Intermediate'}</span>
        <span className="card__owner">
          {project?.createdBy?.name ? project.createdBy.name :'Author Name'}
           <BiSmile size={20} />{" "}
        </span>
      </div>
    </div>
  );
}
