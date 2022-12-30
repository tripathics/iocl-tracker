
import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
  createTheme,
} from "@mui/material";

import { makeStyles } from '@mui/styles'

import { Link } from "react-router-dom";
import DrawerComponent from "../components/DrawerComponent";
import logo from "../media/iocl.png"
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    // marginLeft: theme.spacing(2),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    padding: "5px",
    borderRadius: "1.3rem",
    fontSize: "16px",
    // marginLeft: theme.spacing(20),
    "&:hover": {
      color: "gray",
      border: "2px solid black",
      //borderBottom: "1px solid white",
    },
  },

  toolbar: {
    backgroundColor: "pink"
  }

}));

const navItems = [
  { name: 'Home', url: '/' },
  { name: 'Client', url: '/client' },
  { name: 'Register', url: '/register' },
  { name: 'Sign in', url: '/login' },
]

export function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = true


  return (
    <AppBar position="static" className="navComponent" style={{ backgroundColor: "#FFFF" }} >
      <CssBaseline />
      <Toolbar>
        {/* <Typography variant="h5" className={classes.logo}> */}
        <Typography variant="h5">
          <img src={logo} style={{ width: "200px", height: "auto" }} alt="" />
        </Typography>
        {isMobile ? (
          <DrawerComponent navItems={navItems} />
        ) : (
          // <div className={classes.navlinks}>
          <div>
            {navItems.map((item, i) => (
              // <Link key={i} to={item.url} className={classes.link}>{item.name}</Link>
              <Link key={i} to={item.url}>{item.name}</Link>
            ))}
            {user && <PersonIcon />}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;