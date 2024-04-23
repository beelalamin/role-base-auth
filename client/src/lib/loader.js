import apiRequest from "./apiRequest";

export const singleUser = async ({ req, params }) => {
  const res = await apiRequest("/user/" + params.id);
  return res.data;
};

export const getAllUsers = async ({ req }) => {
  const res = await apiRequest("/users");
  return res.data;
};
