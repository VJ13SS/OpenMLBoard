import { useContext, useState } from "react";
import Project from "../../../components/post/project";
import "./reviewPosts.css";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

export default function ReviewPosts() {
  const [review, setReview] = useState({
    status: "",
    message: "",
    project_id: "",
  });
  const { pendingProjects, baseUrl, getPendingProjects } =
    useContext(AppContext);

  const onSubmitHandler = async (e, id) => {
    e.preventDefault();
    review.project_id = id;

    const response = await axios.post(
      baseUrl + "/api/admin/review-project",
      review
    );
    getPendingProjects();
  };

  return (
    <div className="review-posts">
      <h1>Review Posts</h1>
      {pendingProjects.length === 0 && <span>No Projects to review</span>}
      {pendingProjects.map((project, indx) => (
        <div className="review-post" key={indx}>
          <Project project={project} />
          <form action="" onSubmit={(e) => onSubmitHandler(e, project._id)}>
            <label htmlFor="review">Share the feedback..!</label>
            <textarea
              name=""
              id="review"
              rows={5}
              required
              onChange={(e) =>
                setReview((prev) => ({ ...prev, message: e.target.value }))
              }
            />
            <div className="review-post__options">
              <button
                className="accept"
                onClick={() =>
                  setReview((prev) => ({ ...prev, status: "Accepted" }))
                }
              >
                Accept
              </button>
              <button
                className="modify"
                onClick={() =>
                  setReview((prev) => ({ ...prev, status: "Modify" }))
                }
              >
                Modify
              </button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
