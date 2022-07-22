import React, { Suspense, useEffect, useState } from "react";
import { AuthContext } from "./components/context/auth-context";
import { useAuth } from "./components/hook/auth-hook";
import { CircularProgress } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Header, Content, Footer as FooterContainer } from "rsuite";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Login from "./components/login/login";
import Footer from "./components/footer/footer";
import TopNavigation from "./components/top-navigation/TopNavigation";
import SideNavigation from "./components/side-navigation/SideNavigation";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";

function App() {
  const { login, logout, userId, username, isLoggedIn } = useAuth();

  // Add a request interceptor - appends authorization header always
  axios.interceptors.request.use(function (config) {
    // const userId = JSON.parse(sessionStorage.getItem("session")).userId;
    // config.headers.Authorization = userId ? `Bearer ${userId}` : "";
    config.headers.put["Content-Type"] = "application/json";
    return config;
  });

  let routes = (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/home" element={<Dashboard />} />
      {/* <Route exact path="/home" element={<Home />} /> */}
    </Routes>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        username: username,
        login: login,
        logout: logout,
      }}
    >
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
                {userId !== null && userId !== undefined ? (
                  <TopNavigation />
                ) : null}
              </div>
            </Header>
            <Container>
              {userId !== null && userId !== undefined ? (
                <SideNavigation />
              ) : null}
              <Content className="main-content">
                {routes}

                <FooterContainer>
                  <Footer />
                </FooterContainer>
              </Content>
            </Container>
          </Container>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
