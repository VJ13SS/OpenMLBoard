import "./about.css";
import Project from "../../components/post/project";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";

export default function About() {
  const navigate = useNavigate();
  const {
    projectDetails,
    baseUrl,
    getAuthorDetails,
    getProjectDetails,
    userLoggedIn,
  } = useContext(AppContext);
  const { id } = useParams(); //get the project Id
  const [userComment, setUserComment] = useState({
    type: "add",
  });

  const addComment = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("userDetails")) {
      alert("Please Log In");
      return;
    }
    const response = await axios.post(
      baseUrl + "/api/comments/add-new-comment",
      userComment
    );
    console.log(response.data.message);
    scrollRef.current.scrollTo({
      top:0,
      behavior:'smooth'
    })
    getProjectDetails(projectDetails.project._id);
    setUserComment({
      type: "add",
      authorId: JSON.parse(localStorage.getItem("userDetails"))?.user?._id,
        authorName: JSON.parse(localStorage.getItem("userDetails"))?.user?.name,
        projectId: id,
    });
  };

  const onClickHandler = async (id) => {
    getAuthorDetails(id);
    navigate(`/view-user/${id}`);
  };

  const getUserComment = async (commentId) => {
    const response = await axios.post(
      baseUrl + "/api/comments/get-user-comment",
      { commentId }
    );
    if (response.data.success) {
      setUserComment({
        ...response.data.comment,
        type: "edit",
        authorId: JSON.parse(localStorage.getItem("userDetails"))?.user?._id,
        authorName: JSON.parse(localStorage.getItem("userDetails"))?.user?.name,
        projectId: id,
      });
    } else {
      console.log(response.data.message);
    }
  };

  const deleteComment = async (commentId) => {
    if (confirm("Do you wish to delete this comment?")) {
      const response = await axios.post(
        baseUrl + "/api/comments/delete-comment",
        { commentId }
      );
      if (response.data.success) {
        getProjectDetails(projectDetails.project._id);
      } else {
        console.log(response.data.message);
      }
    }
  };

  const scrollRef = useRef()

  useEffect(() => {
    getProjectDetails(id);
    setUserComment((prev) => ({
      ...prev,
      authorId: JSON.parse(localStorage.getItem("userDetails"))?.user?._id,
      authorName: JSON.parse(localStorage.getItem("userDetails"))?.user?.name,
      projectId: id,
    }));
  }, []);

  return (
    <div className="about">
      <div className="project__details">
        <Project project={projectDetails.project} />
      </div>

      <hr />
      <div className="project__comments-section" >
        <h2>Comments</h2>
        <div className="project__comments" ref={scrollRef}>
          {projectDetails?.comments && projectDetails.comments.length === 0 && <span>No Comments</span>}
          {projectDetails?.comments ? (
            projectDetails.comments.map((comment, indx) => (
              <div className="project__comment" key={indx}>
                <div className="project__comment__header">
                  <span onClick={() => onClickHandler(comment.authorId)}>
                    {comment.authorName}
                  </span>
                  <div className="project__comment__dropdown">
                    <BsThreeDotsVertical />
                    <div className="project__comment__options">
                      <span
                        style={{ color: "blue" }}
                        onClick={() => getUserComment(comment._id)}
                      >
                        Edit
                      </span>
                      <span
                        style={{ color: "red" }}
                        onClick={() => deleteComment(comment._id)}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </div>

                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <div className="project__comment">
              <span onClick={() => navigate("/view-user/13")}>
                Comment Author
              </span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Maiores doloremque numquam a quibusdam rem cupiditate excepturi
                tempore soluta cum expedita nulla dic
              </p>
            </div>
          )}
        </div>
        <div className="project__add-comment">
          <form action="" onSubmit={addComment}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Add a comment..."
              onChange={(e) =>
                setUserComment((prev) => ({ ...prev, comment: e.target.value }))
              }
              value={userComment.comment ? userComment.comment : ""}
            />
            <button>Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
