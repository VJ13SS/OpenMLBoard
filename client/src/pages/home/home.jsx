import { useContext, useEffect, useState } from "react";
import Card from "../../components/card/card";
import "./home.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
export default function Home() {
  const { acceptedProjects, setAcceptedProjects, fetchAllProjects  ,baseUrl } =
    useContext(AppContext);
  const [searchWord, setSearchWord] = useState("");

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
  useEffect(() => {
    fetchAllProjects();
  }, []);
  return (
    <div className="home">
      <div className="search-bar">
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

      <div className="cards">
        {acceptedProjects.map((project, indx) => (
          <Card key={indx} project={project} />
        ))}
      </div>
    </div>
  );
}
