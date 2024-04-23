import { useState } from "react";
import apiRequest from "../lib/apiRequest";

function Test() {
  const [avatar, setImage] = useState();

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(avatar);
    try {
      const res = await apiRequest.post("/test", {
        avatar,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="avatar" onChange={handleChange} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Test;
