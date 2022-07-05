import React, { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import authService from "./services/auth.service"

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const logOut = () => {
    authService.logOut()
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark ps-5 pe-5">
        <Link to={"/"} className="navbar-brand">
          NoteApp
        </Link>
        <div className="navbar-nav mr-auto">
          {user && (
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
          )}
        </div>
        {user ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {user.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  )
}

export default App
