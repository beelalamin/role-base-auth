import { useContext, useState } from "react";
import "./loginpage.scss";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUser, currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post(
        "/auth",

        {
          email,
          password,
        }
      );

      // localStorage.setItem("user", JSON.stringify(res.data));
      updateUser(res.data);
      navigate("/");
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
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input disabled={isloading} type="submit" value="Login" />
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}

export default LoginPage;
