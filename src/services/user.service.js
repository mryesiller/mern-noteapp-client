import axios from "axios"
import authHeader from "./auth.header"
const API_URL = "https://mryesiller-mern-noteapp-server.herokuapp.com/api/test/"

const getPublicContent = async () => {
  return await axios.get(API_URL + "all")
}
const getUserBoard = async () => {
  return await axios.get(API_URL + "user", { headers: authHeader() })
}

const userService = {
  getPublicContent,
  getUserBoard,
}
module.exports = userService
