import { Link, useNavigate, useLoaderData } from "react-router-dom";
import "./useraccount.scss";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";

function UserAccount() {
  const userData = useLoaderData();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const deleteUser = async (id) => {
    const updateUsers = users.filter((user) => user._id !== id);
    setUsers(updateUsers);
    const res = await apiRequest.delete(`/user/${id}`);
    alert(res.data.message);
    navigate("/users");
  };

  // const getUsers = async () => {
  //   try {
  //     const res = await apiRequest.get("/users");
  //     setUsers(res.data);
  //   } catch (error) {
  //     console.error(error + " Can not fetch user");
  //   }
  // };

  useEffect(() => {
    // getUsers();
    setUsers(userData);
  }, []);

  return (
    <div>
      <div className="userNav">
        <h2>Registered Users </h2>
        <Link to="add"> Add user</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Positon</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/user/update/${user._id}`}>
                    <button>Update</button>
                  </Link>
                  <Link>
                    <button onClick={() => deleteUser(user._id)}>
                      {" "}
                      delete
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAccount;
