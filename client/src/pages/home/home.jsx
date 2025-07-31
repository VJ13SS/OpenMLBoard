import { useContext, useEffect } from "react";
import Card from "../../components/card/card";
import "./home.css";
import { AppContext } from "../../context/AppContext";

export default function Home() {
  const {acceptedProjects,fetchAllProjects} = useContext(AppContext)

  useEffect(() => {
    fetchAllProjects()
  },[])
  return (
    <div className="cards">

      {acceptedProjects.map((project,indx) => (<Card key={indx} project={project} />))}
    </div>
  );
}
