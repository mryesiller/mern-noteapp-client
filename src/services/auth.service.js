import axios from "axios"
const API_URL = "https://mryesiller-mern-noteapp-server.herokuapp.com/api/auth/"

const login = async (email, password) => {
  return await axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }
      return response.data
    })
}

const logOut = () => {
  localStorage.removeItem("user")
}

const register = async (username, email, password) => {
  return await axios.post(API_URL + "signup", {
    username,
    email,
    password,
  })
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
}

const authService = {
  login,
  register,
  logOut,
  getCurrentUser,
}
export default authService
