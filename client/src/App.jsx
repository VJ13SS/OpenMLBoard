import { Route, Routes } from "react-router-dom";
import Card from "./components/card/card";
import Navbar from "./components/navbar/navbar";
import "./index.css";
import About from "./pages/about/about";
import Home from "./pages/home/home";
import Footer from "./components/footer/footer";
import LoginPopup from "./components/loginPopup/loginPopup";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/dashboard'/dashboard";
import AddPost from "./pages/dashboard'/addPost/addPost";
import ViewPosts from "./pages/dashboard'/viewPosts/viewPosts";
import ReviewPosts from "./pages/dashboard'/reviewPosts/reviewPosts";
import EditProfile from "./pages/dashboard'/editProfile/editProfile";
import ViewUser from "./pages/viewUser/viewUser";

export default function App() {
  const { displayLoginPopup } = useContext(AppContext);
  
  console.log(import.meta.env.VITE_ADMIN_EMAIL)
  return (
    <div className="app">
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/:id" element={<About />} />
        <Route path="/view-user/:id" element={<ViewUser />}/>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-posts" element={<AddPost />} />
          <Route path="view-posts" element={<ViewPosts />} />
          <Route path="review-posts" element={<ReviewPosts />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
      {displayLoginPopup && <LoginPopup />}
      <hr />
      <Footer />
    </div>
  );
}
