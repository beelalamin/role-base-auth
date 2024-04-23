import React, { useContext } from "react";
import "./navbar.scss"
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <span>Dashboard</span>
      <span>Welcome <b>{currentUser.firstName + " " + currentUser.lastName}</b></span>
    </nav>
  );
}

export default Navbar;
