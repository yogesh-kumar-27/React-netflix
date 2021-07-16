import React, { useState, useEffect } from "react";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";

// url = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
const Navbar = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => {
      window.addEventListener("scroll", transitionNavbar);
    };
  }, []);

  return (
    <>
      <div className={`navbar ${show && "nav_black"}`}>
        <div className="container">
          <div className="left">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
              onClick={() => history.push("/")}
            />
            <span>Homepage</span>
            <span>Series</span>
            <span>Movies</span>
            <span>New and Popular</span>
            <span>My List</span>
          </div>
          <div className="right">
            <Search className="icon" />
            <span>KID</span>
            <Notifications className="icon" />
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <div className="profile">
              <ArrowDropDown className="icon" />
              <div className="options">
                <span onClick={() => history.push("/profile")}>Profile</span>
                <span onClick={() => auth.signOut()}>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
