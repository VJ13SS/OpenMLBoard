import "./viewPosts.css";
import Project from "../../../components/post/project";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

export default function ViewPosts() {
  const { userProjects } = useContext(AppContext);
  return (
    <div className="view-posts">
      <h1>Your Post's</h1>
      {userProjects ? userProjects.map((project,indx) => (<div className="view-post"  key={indx}><Project project={project} /></div>)) : 
      <div className="view-post">
        <Project />
      </div>}
      
    </div>
  );
}
