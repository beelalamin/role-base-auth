import { useLoaderData } from "react-router-dom";
import "./userlist.scss";

function UserList() {
  const users = useLoaderData();

  return (
    <div className="table_container">
      <div className="userNav">
        <h2>All Users </h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Positon</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={"http://localhost:5000/images/" + user.avatar}
                    alt=""
                  />
                </td>
                <td>{user._id}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>{user.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
