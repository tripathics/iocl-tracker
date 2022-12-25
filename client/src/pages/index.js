import React from "react"
import Admin from "./admin"
import Client from "./client"
import LayoutComponent from "../layout/layoutcomponent"

const Home = () => {
  return (
    <LayoutComponent>
      <div className="home">
        <h1>Welcome to IOCL Vehicle Management System</h1>
        <div className="main">
          <a className="nav-btn" href="/admin">Admin</a>
          <a className="nav-btn" href="/client">Client</a>
        </div>
      </div>
    </LayoutComponent>
  )
}

export { Home, Admin, Client }