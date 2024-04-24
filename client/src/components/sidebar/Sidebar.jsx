import { useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import "./sidebar.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Sidebar({ routes }) {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await apiRequest.post("/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside>
      <div className="sidebarContainer">
        {routes.map((i) => (
          <NavLink
            key={i.link}
            to={i.link}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {i.lable}
          </NavLink>
        ))}
        {/* <Link to="/users">User Account</Link>
        <Link to="/hr">Human Resource</Link>
        <Link to="/profile">Employee Profile</Link> */}
        <Link onClick={logoutUser}>Quit</Link>
      </div>
    </aside>
  );
}
export default Sidebar;
