import { useContext, useState } from "react";
import "./editProfile.css";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

export default function EditProfile() {
  const [edit, setEdit] = useState(false);
  const { userLoggedIn, setUserLoggedIn, baseUrl } = useContext(AppContext);
  const [userDetails, setUserDetails] = useState(
    userLoggedIn?.user
      ? userLoggedIn.user
      : {
          _id: "1234",
          email: "dummy@gmail.com",
          name: "dummy",
          password: "12345678",
          url: "link",
        }
  );

  const updateUserProfile = async () => {
    const response = await axios.post(
      baseUrl + "/api/user/update-user-profile",
      userDetails
    );
    setUserLoggedIn((prev) => ({ ...prev, user: userDetails }));
    localStorage.setItem("userDetails", JSON.stringify(userLoggedIn));
    console.log(response.data);
  };
  const onClickHandler = () => {
    if (edit) {
      updateUserProfile();
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return (
    <div className="edit-profile">
      <form action="">
        <span>
          Email {" "}
          {!edit ? (
            <span className="profile__item">{userDetails.email}</span>
          ) : (
            <input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              required
              value={userDetails["email"]}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          )}
        </span>

        <span>
          User Name {" "}
          {!edit ? (
            <span className="profile__item">{userDetails.name}</span>
          ) : (
            <input
              type="text"
              placeholder="John Doe"
              name="name"
              required
              value={userDetails["name"]}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          )}
        </span>

        <span>
          Password {" "}
          {!edit ? (
            <span className="profile__item">{userDetails.password}</span>
          ) : (
            <input
              type="password"
              name="password"
              placeholder="********"
              required
              value={userDetails["password"]}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          )}
        </span>

        <span>
          URL {" "}
          {!edit ? (
            <span className="profile__item">{userDetails.url}</span>
          ) : (
            <input
              type="text"
              placeholder="https://portfolio.com"
              name="url"
              value={userDetails["url"]}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          )}
        </span>
      </form>

      <button onClick={onClickHandler}>{!edit ? "Edit" : "Submit"}</button>
    </div>
  );
}
