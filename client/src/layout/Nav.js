import React from "react";
import { NavLink } from "react-router-dom";
import config from "../config/config";

const navItems = {
  main: [
    { url: '/', icon: 'floppy', label: 'Home' },
  ],
  noAuth: [
    { url: '/signin', icon: 'floppy', label: 'Login' },
  ],
  auth: [
    { url: '/admin', icon: 'floppy', label: 'Admin' },
    { url: '/register', icon: 'floppy', label: 'Register' },
    // { url: '/logout', icon: 'floppy', label: 'Logout' },
  ],
}

const NavItem = ({ url, label }) => {
  return (
    <li>
      <NavLink to={url} >{label}</NavLink>
    </li>
  )
}

const MyNavComponent = ({ user }) => {
  return (
    <div className="navbar-component">
      <nav className="mobile-nav">
        <ul className="nav-list">
          {navItems.main.map((item, i) => (
            <NavItem key={`mm${i}`} url={item.url} label={item.label} />
          ))}

          {user ? (<>
            {navItems.auth.map((item, i) => (
              <NavItem key={`ma${i}`} url={item.url} label={item.label} />
            ))}

            <li>
              <a href={`${config.API_BASE_URL}/users/logout`}>Logout</a>
            </li>
          </>) : (
            <NavItem url='/login' label='Login' />
          )}
        </ul>
      </nav>
    </div>
  );
}

export default MyNavComponent;