import React, { Suspense, useEffect, useState } from "react";
// import { AuthContext } from "./context/auth-context";
// import { useAuth } from "./hook/auth-hook";
import { CircularProgress } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Header, Content, Footer as FooterContainer } from "rsuite";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Login from "./component/login/login";
import RegisterUser from "./component/register-user/registerUser";



import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";

function App() {
  // const { token, login, logout, userId, username, role, updateUsername } =
  // useAuth();

// Add a request interceptor - appends authorization header always
axios.interceptors.request.use(function (config) {
  const token = JSON.parse(sessionStorage.getItem("session")).token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers.put["Content-Type"] = "application/json";
  return config;
});

let routes = (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/register/user" element={<RegisterUser />} />
    {/* <Route exact path="/home" element={<Home />} /> */}
  </Routes>
);

return (
  // <AuthContext.Provider
  //   value={{
  //     isLoggedIn: !!token,
  //     token: token,
  //     userId: userId,
  //     username: username,
  //     role: role,
  //     login: login,
  //     logout: logout,
  //     updateUsername: updateUsername,
  //   }}
  // >
    <Router>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        draggable={false}
        progress={undefined}
        position={toast.POSITION.TOP_RIGHT}
        style={{ zIndex: "10000", marginTop: "3%" }}
      />
      <div>
        <Container>
          <Header>
            <div className="">
              {/* {userId && role && (
                <TopNavigation updateNav={updateNav} setNav={setUpdateNav} />
              )} */}
            </div>
          </Header>
          <Container>
            {routes}

            <FooterContainer>
              {/* <Footer /> */}
            </FooterContainer>
          </Container>
        </Container>
      </div>
    </Router>
  // </AuthContext.Provider>
);
}
export default App;
