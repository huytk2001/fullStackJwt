import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Menu,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { LogoutUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
Header.propTypes = {};

function Header(props) {
  const currentUser = useSelector((state) => state.user.login.currentUser);
  const isLogginOut = useSelector((state) => state.user.logout.currentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  // const const anchorRef = React.useRef(null);
  // let axiosJWT = axios.create();
  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.post("/v1/auth/refresh", {
  //       withCredentials: true,
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleLogout = () => {
    dispatch(LogoutUser()); // Ensure LogoutUser is defined in your Redux slice
  };

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let data = new Date();
  //     const decodedToken = jwtDecode(currentUser?.accessToken);
  //     if (decodedToken.exp < data.getTime() / 1000) {
  //       const data = await refreshToken();
  //       const refreshUser = {
  //         ...currentUser,
  //         accessToken: data.accessToken,
  //       };
  //       dispatch(LoginUser(refreshUser));
  //       config.headers["token"] = "Bearer" + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                BookShop
              </Link>
            </Typography>

            <NavLink to="/product">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Product
              </Button>
            </NavLink>
            <NavLink to="/menu">
              <Button
                color="inherit"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Menu
              </Button>
            </NavLink>
            {currentUser ? (
              // <Typography variant="h7" sx={{ color: "#fff" }}>
              //   {currentUser.user.username}
              //   <MenuList
              //     keepMounted
              //     anchorRef={anchorRef}
              //     id="composition-menu"
              //     aria-labelledby="composition-button"
              //     // onKeyDown={handleListKeyDown}
              //   >
              //     <MenuItem onClick={handleClose}>Profile</MenuItem>
              //     <MenuItem onClick={handleClose}>My account</MenuItem>
              //     <MenuItem disabled={isLogginOut} onClick={handleLogout}>
              //       Logout
              //     </MenuItem>
              //   </MenuList>
              // </Typography>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      {/* {currentUser.user.username} */}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>Profile</MenuItem>
                      <MenuItem onClick={popupState.close}>My account</MenuItem>
                      <MenuItem disabled={isLogginOut} onClick={handleLogout}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            ) : (
              <NavLink to="/login">
                <Button style={{ textDecoration: "none", color: "#fff" }}>
                  Login
                </Button>
              </NavLink>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
