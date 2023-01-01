import React from "react";
import { NavLink } from "react-router-dom";
import config from "../config/config";

import { AppBar, Container, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { Box } from "@mui/system";

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
  ],
}

const NavItem = ({ url, label }) => {
  return (
    <li>
      <NavLink to={url} >{label}</NavLink>
    </li>
  )
}

const Navigation = ({ user }) => {
  return (
    <div className="navbar-component">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              
            </Box>
            <List>
              {navItems.main.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

              {user ? (<>
                {navItems.auth.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </>) : (
                <ListItem key={'login'} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={'Login'} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
            {/* <nav className="mobile-nav">
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
            </nav> */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navigation;