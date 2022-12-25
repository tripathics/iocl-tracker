
import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import DrawerComponent from "../components/DrawerComponent";
import logo from "../media/iocl.png"
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(2),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    padding:"5px",
    borderRadius:"1.3rem",
    fontSize: "16px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "gray",
      border:"2px solid black",
      //borderBottom: "1px solid white",
    },
  },

  toolbar: {
    backgroundColor:"pink"
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
  const user=undefined


  return (
    <AppBar position="static" className="navComponent"   style={{ backgroundColor: "#FFFF" }} >
      <CssBaseline  />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}> 
        <img src={logo} style={{width:"200px" ,height:"auto"}} alt=""></img>
        </Typography>
        {isMobile ? (
          <DrawerComponent navItems={navItems} />
        ) : (
          <div className={classes.navlinks}>
            {navItems.map((item, i) => (
              <Link key={i} to={item.url} className={classes.link}>{item.name}</Link>
            ))}
            {user && <PersonIcon/>}            
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;