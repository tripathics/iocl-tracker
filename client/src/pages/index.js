import React from "react"
import Admin from "./admin"
import Client from "./client"

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to IOCL Vehicle Management System</h1>
      <div className="main">
        <a className="nav-btn" href="/admin">Admin</a>
        <a className="nav-btn" href="/client">Client</a>
      </div>
    </div>
  )
}

export { Home, Admin, Client }