import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from ".././src/assets/github-mark-white.svg";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
          <img src={Logo} alt="GitHub Logo" />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
