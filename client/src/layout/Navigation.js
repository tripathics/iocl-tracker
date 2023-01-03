import React from "react";
import { NavLink } from "react-router-dom";

import { 
  AppBar, Toolbar, Container, Typography, Menu, MenuItem, Button, IconButton, 
  Tooltip, Avatar 
} from "@mui/material";
import { Box } from "@mui/system";

import { 
  Menu as MenuIcon,
  Adb as AdbIcon,
} from '@mui/icons-material'

const Logo = ({ display }) => {
  const sxDisplay = { xs: 'flex', md: 'none' };
  const responsiveProps = {
    variant: 'h5',
    flexGrow: 1
  }
  if (display === 'desktop') {
    sxDisplay.xs = 'none';
    sxDisplay.md = 'flex';
    responsiveProps.variant = 'h6';
    responsiveProps.flexGrow = 0;
  }
  return (<>
    <AdbIcon sx={{ display: sxDisplay, mr: 1 }} />
    <Typography
      {...responsiveProps}
      noWrap
      component={NavLink} to='/'
      sx={{
        mr: 2,
        display: sxDisplay,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}>
      VSS
    </Typography>
  </>)
}

const NavBox = ({ display, children }) => {
  const xsDisplay = display === 'mobile' 
                    ? { xs: 'flex', md: 'none' }
                    : { xs: 'none', md: 'flex' };

  return (
    <Box sx={{ flexGrow: 1, display: xsDisplay }}>
      {children}
    </Box>
  )
}

const navItems = {
  main: [
    { url: '/', icon: 'floppy', label: 'Home' },
    { url: '/login', icon: 'floppy', label: 'Login' },
  ],
  auth: [
    { url: '/', icon: 'floppy', label: 'Home' },
    { url: '/admin', icon: 'floppy', label: 'Admin' },
    { url: '/register', icon: 'floppy', label: 'Register' },
  ],
}

function Navigation({ logoutUser, user }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseNavMenu();
    logoutUser();
  }

  const pages = user ? navItems.auth : navItems.main

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo display='desktop' />

          <NavBox display='mobile'>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" 
              aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >
              <MenuIcon />
            </IconButton>

            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
              keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
              open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' }, }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label}
                  onClick={handleCloseNavMenu}
                  component={NavLink} to={page.url}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </NavBox>

          <Logo display='mobile' />
          <NavBox display='desktop'>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                LinkComponent={NavLink} to={page.url}
              >{page.label}</Button>
            ))}
          </NavBox>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              {user && (
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;