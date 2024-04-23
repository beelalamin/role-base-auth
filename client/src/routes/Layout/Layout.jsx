import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
        <Sidebar
          routes={[
            {
              lable: "User Account",
              link: "users",
            },
            {
              lable: "Human Resources",
              link: "hr",
            },
            {
              lable: "Employee Profile",
              link: "profile",
            },
          ]}
        />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function HrLayout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
        <Sidebar
          routes={[
            {
              lable: "Human Resources",
              link: "hr",
            },
            {
              lable: "Employee Profile",
              link: "profile",
            },
          ]}
        />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function UserLayout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
        <Sidebar
          routes={[
            {
              lable: "Employee Profile",
              link: "profile",
            },
          ]}
        />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
export { AdminLayout, HrLayout, UserLayout };
