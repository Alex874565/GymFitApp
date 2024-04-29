import React from "react";
import "./Footer.css";
import github from "../../../assets/github.png";
import instagram from "../../../assets/instagram.png";
import linkedin from "../../../assets/linkedin.png";
import Logo from "../../../assets/Logo.png";

export const Footer = () => {
  return (
    <>
      <div className="blur footer-blur"></div>
      <div className="Footer-container">
        <hr />
        <div className="footer">
          <div className="social-links">
            <img src={github} alt="" />
            <img src={instagram} alt="" />
            <img src={linkedin} alt="" />
          </div>

          {/* <div className="logo-f">
          <img src={Logo} alt="" />
        </div> */}
        </div>
      </div>
    </>
  );
};
