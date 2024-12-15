import React from "react";
import PropTypes from "prop-types";
import Header from "../component/Header";
import { Outlet } from "react-router-dom";

Home.propTypes = {};

function Home(props) {
  return (
    <>
      <Header /> <Outlet />
    </>
  );
}

export default Home;
