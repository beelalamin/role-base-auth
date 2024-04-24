import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLayout, HrLayout, UserLayout } from "./routes/Layout/Layout";
import UserAccount from "./routes/userAccount/UserAccount";
import HumanResource from "./routes/HumanResource/HumanResource";
import EmployeeProfile from "./routes/employeeProfile/EmployeeProfile";
import AddUser from "./routes/adduser/AddUser";
import LoginPage from "./routes/loginPage/LoginPage";
import PageNotFound from "./routes/404/PageNotFound";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { singleUser, getAllUsers } from "./lib/loader";
import UpdateUserProfile from "./routes/updateuser/UpdateUser";
import UserList from "./routes/usersList/UsersList";

function App() {
  const { currentUser } = useContext(AuthContext);

  const router = () => {
    const role = currentUser?.role;

    return !role
      ? publicRoutes
      : role === "admin"
      ? adminRoutes
      : role === "hr"
      ? hrRoutes
      : role === "user"
      ? userRoutes
      : publicRoutes;
  };

  const publicRoutes = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/users",
      element: <UserList />,
      loader: getAllUsers,
    },
  ]);

  const userRoutes = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "/profile",
          element: <EmployeeProfile />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  const hrRoutes = createBrowserRouter([
    {
      path: "/",
      element: <HrLayout />,
      children: [
        {
          path: "/hr",
          element: <HumanResource />,
        },
        {
          path: "/profile",
          element: <EmployeeProfile />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  const adminRoutes = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "/users",
          element: <UserAccount />,
          loader: getAllUsers,
        },
        {
          path: "/hr",
          element: <HumanResource />,
        },
        {
          path: "/profile",
          element: <EmployeeProfile />,
        },
        {
          path: "/users/add",
          element: <AddUser />,
        },
        {
          path: "/user/update/:id",
          element: <UpdateUserProfile />,
          loader: singleUser,
        },
        // {
        //   path: "/user/:id",
        //   element: <UpdateUser />,
        // },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router()} />;
}

export default App;
