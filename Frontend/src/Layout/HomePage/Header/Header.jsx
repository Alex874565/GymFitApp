import React, { useState } from "react";
import Logo from "../../../assets/Logo.png";
import bars from "../../../assets/bars.png";
import { Link } from "react-router-dom";

export const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 bg-transparent text-white">
      <img src={Logo} className="w-40 h-12" alt="Logo" />

      {menuOpened === false && mobile === true ? (
        <div
          className="bg-blue-500 p-2 rounded"
          onClick={() => setMenuOpened(true)}
        >
          <img src={bars} alt="Menu" className="w-6 h-6" />
        </div>
      ) : (
        <ul className="flex flex-col md:flex-row list-none gap-4 items-center">
          <li
            onClick={() => setMenuOpened(false)}
            className="hover:text-orange-600 cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => setMenuOpened(false)}
            className="hover:text-orange-600 cursor-pointer"
          >
            Programs
          </li>
          <li
            onClick={() => setMenuOpened(false)}
            className="hover:text-orange-600 cursor-pointer"
          >
            Why us
          </li>
          <li
            onClick={() => setMenuOpened(false)}
            className="hover:text-orange-600 cursor-pointer"
          >
            Testimonials
          </li>
          <Link
            to="/register"
            className="btn bg-blue-500 text-white px-4 py-2 rounded hover:text-orange-600"
          >
            Join Now
          </Link>
        </ul>
      )}
    </div>
  );
};
