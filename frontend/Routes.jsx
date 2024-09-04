import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

//Page List:
import Dashboard from "./Components/dashboard/Dashboard.jsx";
import Signup from "./Components/auth/Signup.jsx";
import Login from "./Components/auth/Login.jsx";
import Profile from "./Components/user/Profile.jsx";

import { useAuth } from "./authContext.jsx";
const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/auth", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/auth");
    }

    if (userIdFromStorage && window.location.pathname == "/auth") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return element;
};
export default ProjectRoutes;
