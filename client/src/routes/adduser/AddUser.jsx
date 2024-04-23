import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./adduser.scss";
import apiRequest from "../../lib/apiRequest";

function AddUser() {
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const position = formData.get("position");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");
    const avatar = formData.get("avatar");

    console.log(avatar);
    // try {
    //   const res = await apiRequest.post("/register", {
    //     firstName,
    //     lastName,
    //     position,
    //     email,
    //     password,
    //     role,
    //     avatar,
    //   });
    //   console.log(res.data);
    //   alert(res.data.message);
    //   navigate("/users");
    // } catch (err) {
    //   console.log(err);
    //   console.error(err.response.data.message);
    //   setError(err.response.data.message);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Add New User</h2>
        <input name="firstName" type="text" placeholder="First Name" required />
        <input name="lastName" type="text" placeholder="Last Name" required />
        <input name="position" type="text" placeholder="Position" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <div className="formGroup">
          <select name="role" type="select" id="role">
            <option value="">Role</option>
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="user">User</option>
          </select>

          <input
            type="file"
            name="avatar"
            accept="image/png, image/gif, image/jpeg"
          />
        </div>

        <input type="submit" value="Create user" />
        {error && <span className="error">{error}</span>}
      </form>
    </div>
  );
}

export default AddUser;
