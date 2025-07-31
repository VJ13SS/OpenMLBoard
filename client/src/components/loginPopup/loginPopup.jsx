import { useContext, useState } from "react";
import "./loginPopup.css";
import { IoMdClose } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

export default function LoginPopup() {
  const {
    currentState,
    setCurrentState,
    userDetails,
    setUserDetails,
    setDisplayLoginPopup,
    baseUrl,
    setUserLoggedIn,
  } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (currentState === "log-in") {
      const response = await axios.post(
        baseUrl + "/api/user/log-in",
        userDetails
      );
      if (response.data.success) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userDetails)
        );
        setUserLoggedIn(response.data.userDetails);
      }
      else{
        console.log(response.data.messagw);
      }

      document.body.classList.remove("no-scroll");
      setDisplayLoginPopup(false);
    } else {
      const response = await axios.post(
        baseUrl + "/api/user/sign-in",
        userDetails
      );
      setCurrentState("log-in");
      if(!response.data.success){
        console.log(response.data.messagw);
      }
      
    }
  };

  const onClickHandler = () => {
    document.body.classList.remove("no-scroll");
    setDisplayLoginPopup(false);
  };

  return (
    <div className="login-popup-overlay">
      <form action="" onSubmit={onSubmitHandler}>
        {currentState === "log-in" ? <h1>User LogIn</h1> : <h1>User SignIn</h1>}
        <IoMdClose size={20} onClick={onClickHandler} className="close-icon" />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="john@gmail.com"
          name="user_email"
          id="email"
          required
          onChange={(e) =>
            setUserDetails((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        {currentState === "sign-in" && (
          <>
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              placeholder="John Doe"
              id="name"
              name="user_name"
              required
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="user_password"
          id="password"
          placeholder="********"
          required
          onChange={(e) =>
            setUserDetails((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
        />
        {currentState === "sign-in" && (
          <>
            <label htmlFor="url">URL</label>
            <input
              type="text"
              placeholder="https://portfolio.com"
              id="url"
              name="user_url"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </>
        )}

        <button>Submit</button>

        {currentState === "sign-in" ? (
          <p>
            Already have an Account?{" "}
            <span onClick={() => setCurrentState("log-in")}>Login</span>
          </p>
        ) : (
          <p>
            New User?{" "}
            <span onClick={() => setCurrentState("sign-in")}>Sign In</span>
          </p>
        )}
      </form>
    </div>
  );
}
