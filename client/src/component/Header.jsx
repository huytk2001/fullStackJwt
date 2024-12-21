import React, { useEffect, useRef, useState } from "react";
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
  Badge,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { logoutDetails, LogoutUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Close, ShoppingCart } from "@mui/icons-material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { cartItemsCountSelector } from "../redux/Card/selectors";
import { clearCart, fetchCartItems, removeFromCard,  } from "../redux/Card/cardSlice";
import { persist } from "../app/store";
Header.propTypes = {};

function Header(props) {
  const currentUser = useSelector((state) => state.user.login.currentUser);
  const isLogginOut = useSelector((state) => state.user.logout.currentUser);
  const user = useSelector((state) => state.user);
  console.log("Redux User State:", user);
  const dispatch = useDispatch();
  const negative = useNavigate();
  const cardItemsCount = useSelector(cartItemsCountSelector);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleCartClick = () => {
    negative("card");
  };
  useEffect(() => {
    dispatch(fetchCartItems()); // Fetch dữ liệu từ API
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(removeFromCard());
    dispatch(clearCart()),
    dispatch(logoutDetails())
    persist.purge();
    dispatch(LogoutUser());
    negative("/");

    // Ensure LogoutUser is defined in your Redux slice
  };

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
          
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      <PersonIcon />
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

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge
                badgeContent={cardItemsCount}
                color="error"
                
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
