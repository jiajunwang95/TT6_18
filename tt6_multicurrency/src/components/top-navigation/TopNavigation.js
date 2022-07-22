import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Navbar, Container } from "react-bootstrap";
import { toast } from "react-toastify";

import Badge from "rsuite/Badge";
import NoticeIcon from "@rsuite/icons/Notice";
import ExitIcon from "@rsuite/icons/Exit";
import GearIcon from "@rsuite/icons/Gear";
import IconButton from "rsuite/IconButton";
import "./TopNavigation.css";

const TopNavigation = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("Logged out.");
    auth.logout();
    navigate("/", { replace: true });
  };

  const convertFromStringToDate = (responseDate) => {
    let dateComponents = responseDate.split("T");
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return (
      "" +
      datePieces[2] +
      "/" +
      datePieces[1] +
      "/" +
      datePieces[0] +
      ", " +
      timePieces[0] +
      ":" +
      timePieces[1] +
      ":" +
      timePieces[2]
    );
  };

  const convertDate = (data) => {
    if (data !== null && data !== undefined) {
      for (var item of data) {
        const datestr = item["reportDateTime"];
        var newDateTime = convertFromStringToDate(datestr);
        item.reportDateTimeDisplay = newDateTime;
      }
    } else console.log("Event data is undefined.");
  };

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="topnav-container">
          <Navbar.Brand href="#home">TechTrek 6</Navbar.Brand>
          <div className="topnav-right-container">
            <div className="topnav-welcome">Welcome, {auth.username}</div>

            <div className="topnav-logout_icon">
              <IconButton
                padding="0px"
                onClick={logoutHandler}
                icon={<ExitIcon color="white" />}
                appearance="link"
              />
            </div>
          </div>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default TopNavigation;
