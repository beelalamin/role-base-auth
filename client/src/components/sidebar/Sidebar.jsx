import { useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function Sidebar({ routes }) {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const res = await apiRequest.post("/logout");
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
          <Link key={i.link} to={i.link}>{i.lable}</Link>
        ))}
        {/* <Link to="/users">User Account</Link>
        <Link to="/hr">Human Resource</Link>
        <Link to="/profile">Employee Profile</Link> */}
        <Link onClick={logoutUser}>
          Quit
        </Link>
      </div>
    </aside>
  );
}
export default Sidebar;
