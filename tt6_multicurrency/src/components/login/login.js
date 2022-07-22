import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { FormControl, Input, TextField } from "@mui/material";

import { toast } from "react-toastify";
import Logo from "../../images/hello.png";
import "./login.css";

// var md5 = require("md5");

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("dying here... ")
    // const userId = JSON.parse(sessionStorage.getItem("session")).userId;
    // const username = JSON.parse(sessionStorage.getItem("session")).username;

    if (auth.isLoggedIn && auth.userId && location.state)
      navigate(location.state.from.pathname);
    else if (auth.isLoggedIn && auth.userId)
      navigate("/home", { replace: true });
    else navigate("/", { replace: true });
  }, [auth.isLoggedIn, auth.userId, location.state, navigate]);

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      console.log("userName: " + username);
      console.log("password: " + password);

      const userDetails = {
        username: username,
        password: password,
      };

      // const uninterceptedAxiosInstance = axios.create(); // create new axios without interceptors
      // const response = await uninterceptedAxiosInstance.post(
      //   process.env.REACT_APP_API_FLASK + "/login", userDetails,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (response.status === 200) {
      //   auth.login(response.data.username, response.data.userId);
       // sessionStorage.setItem("name", "response.data.name");
      //   navigate("/home", { replace: true });
      // } else toast.error("Server might be down. Please try again later.");

      if (username === "user101" && password === "123456") {
        console.log("Check entry... login pass");
        auth.login(username, 1);
        sessionStorage.setItem("name", "Jacky");
        navigate("/home", { replace: true });
      } else {
        toast.error("Incorrect username or password.");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404)
          toast.error("Incorrect username or password.");
      } else toast.error("Server might be down. Please try again later.");
    }
  };

  return (
    <div className="background-img">
      <div className="login-container">
        <Card className="login-card">
          <Card.Header className="login-card_header">
            <Card.Title>
              <img src={Logo} alt="TT6 Logo" width="120" />
              <h5>TT6 Multicurrency Login</h5>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <br />
            <Form id="timerProfileForm" className="form-margin-width">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" required />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" required />
                </Form.Group>
              </Row>
              <br />
              <div className="login-card_bottom-container">
                {/* <Card.Link href="/forget/password">Forgot Password?</Card.Link> */}
                <Button
                  type="submit"
                  onClick={loginHandler}
                  disabled={isSubmitting}
                  className="btn btn-primary login-button"
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1" />
                  )}

                  {!isSubmitting ? " Login" : " Loading"}
                </Button>
              </div>
            </Form>
          </Card.Body>
          {/* <Card.Footer className="login-card_footer">
            <Link to={{ pathname: "/register/user" }}>
              New user? Register here!
            </Link>
          </Card.Footer> */}
        </Card>
      </div>
    </div>
  );
};

export default Login;
