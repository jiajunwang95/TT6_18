import React, { useContext } from "react";

import "./footer.css";

const Footer = () => {
  return (
    <div id="layoutAuthentication_footer">
      <footer className="footer px-4 bg-light">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">
              COPYRIGHT &copy;{" "}
              <script>document.write(new Date().getFullYear())</script>
              <br />
              TECHTREK 6. ALL RIGHTS RESERVED.
            </div>
            <div style={{position:"fixed", right:"2vw"}}>
              <a href="#">Privacy Policy</a>
              &middot;
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
