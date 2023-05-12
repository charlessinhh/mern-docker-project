import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://get.wallhere.com/photo/reactJS-JavaScript-Typescript-programming-programming-language-React-Native-Facebook-react-apps-Front-End-developer-1568827.jpg"
      />{" "}
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/user">User profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              Logout {JSON.parse(auth).name}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            {" "}
            <Link to="/signup">Sign Up</Link>{" "}
          </li>
          <li>
            <Link to="/login">Login</Link>{" "}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
