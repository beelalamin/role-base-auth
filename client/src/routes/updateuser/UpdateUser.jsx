import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./updateuser.scss";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function UpdateUserProfile() {
  const user = useLoaderData();
  const { updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [position, setPosition] = useState(user.position);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [role, setRole] = useState(user.role);
  const [avatar, setAvatar] = useState(user.avatar);

  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await apiRequest.put(
        `/user/update/${user.id}`,
        {
          firstName,
          lastName,
          position,
          email,
          password,
          role,
          avatar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      updateUser(res.data);
      alert(res.data.message);
      navigate("/users");
    } catch (err) {
      console.log(err);
      console.error(err.response.data.message);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        <input
          type="text"
          placeholder="First Name"
          defaultValue={user.firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={user.lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          defaultValue={user.position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={user.email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="formGroup">
          <select
            type="select"
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option defaultValue={user.role}>{user.role}</option>
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="user">User</option>
          </select>

          <input
            type="file"
            name="avatar"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        <input type="submit" disabled={isloading} defaultValue="update" />
      </form>
    </div>
  );
}

export default UpdateUserProfile;
