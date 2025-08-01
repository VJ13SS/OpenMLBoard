import { useContext, useState } from "react";
import "./addPost.css";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

export default function AddPost() {
  const { editProject, userLoggedIn, baseUrl } = useContext(AppContext);
  const [projectDetails, setProjectDetails] = useState(
    editProject?.name
      ? {
          project__name: editProject.name,
          project__description: editProject.description,
          project__category: editProject.category,
          project__link_1: editProject.links[0],
          project__link_2: editProject.links[1],
          type:'edit',
          original:editProject
        }
      : { type: "add",original:{} }
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      baseUrl + "/api/user/add-new-project",
      projectDetails,
      { headers: { token: userLoggedIn.token } }
    );
    setProjectDetails({ type: "add",original:{}});
  };

  return (
    <div className="add-post">
      <h1>Add Your Project</h1>
      <span>
        **project will be viewed publically after approval of our team**
      </span>

      <form action="" onSubmit={onSubmitHandler}>
        <label htmlFor="p__name">Project Name</label>
        <input
          type="text"
          name="project__name"
          id="p__name"
          onChange={(e) =>
            setProjectDetails((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          placeholder="Image Classification"
          required
          value={
            projectDetails?.project__name ? projectDetails?.project__name : ""
          }
        />
        <label htmlFor="p__description">Project Description</label>
        <textarea
          name="project__description"
          onChange={(e) =>
            setProjectDetails((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          id="p__description"
          placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit. At itaque provident asperiores molestias similique commodi reicie"
          rows={10}
          cols={10}
          required
          value={
            projectDetails?.project__description
              ? projectDetails?.project__description
              : ""
          }
        />
        <label htmlFor="p">Project Category</label>
        <select
          name="project__category"
          id="p__category"
          onChange={(e) =>
            setProjectDetails((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          style={{
            width: "fit-content",
            height: "30px",
            borderRadius: "5px",
            padding: "3px",
            marginLeft: "7px",
          }}
          required
          value={
            projectDetails?.project__category
              ? projectDetails?.project__category
              : ""
          }
        >
          <option value="">Select</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <label htmlFor="p__link1">Project Link 1</label>
        <input
          type="text"
          name="project__link_1"
          onChange={(e) =>
            setProjectDetails((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          id="p__link1"
          placeholder="https://github.com"
          required
          value={
            projectDetails?.project__link_1
              ? projectDetails.project__link_1
              : ""
          }
        />
        <label htmlFor="p__link2">Project Link 2</label>
        <input
          type="text"
          name="project__link_2"
          id="p__link2"
          placeholder="https://live-link.com"
          onChange={(e) =>
            setProjectDetails((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          value={
            projectDetails?.project__link_2
              ? projectDetails.project__link_2
              : ""
          }
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
