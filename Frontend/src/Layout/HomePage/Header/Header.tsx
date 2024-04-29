import React, { useState } from "react";
import "./Header.css";
import Logo from "../../../assets/Logo.png";
import bars from "../../../assets/bars.png";
import { Link } from "react-router-dom";
export const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="header" id="home">
      <img src={Logo} className="logo" />

      {menuOpened === false && mobile === true ? (
        <div
          style={{
            backgroundColor: "var(--appColor)",
            padding: "0.5rem",
            borderRadius: "5px",
          }}
          onClick={() => setMenuOpened(true)}
        >
          <img
            src={bars}
            alt=""
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </div>
      ) : (
        <ul className="header-menu">
          <li>Home</li>
          <li onClick={() => setMenuOpened(false)}>Programs</li>
          <li onClick={() => setMenuOpened(false)}>Why us</li>
          <li onClick={() => setMenuOpened(false)}>Testimonials</li>
          <Link to="/register" className="btn">
            Join Now
          </Link>
        </ul>
      )}
    </div>
  );
};
