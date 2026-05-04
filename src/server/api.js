import axios from "axios";

const apiUrl = import.meta.env.VITE_AUTH_URL; // https://todo-redev.herokuapp.com/api
const TOKEN = import.meta.env.VITE_AUTH_TOKEN; //токен

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: TOKEN,
  },
});

export const register = async (formData) => {
  try {
    const response = await instance.post("/users/register", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logIn = async ({ email, password }) => {
  try {
    const response = await instance.post("/auth/login", { email, password });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
