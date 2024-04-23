import { useContext } from "react";
import "./employeeprofile.scss";
import { AuthContext } from "../../context/AuthContext";

function EmployeeProfile() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profileContainer">
      <img src="/noavatar.jpg" alt="" />

      <span>
        <b>User Id: </b>
        {currentUser._id}
      </span>
      <span>
        <b>Email: </b>
        {currentUser.email}
      </span>
      <span>
        <b>Position: </b>
        {currentUser.position}
      </span>
    </div>
  );
}

export default EmployeeProfile;
