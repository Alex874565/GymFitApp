import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import imageUser from "../../assets/t-image1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 bg-opacity-60 backdrop-blur-md p-4 text-white flex justify-between items-center fixed w-full z-20">
      <div className="flex-grow text-center">
        <div className="flex justify-center space-x-4">
          <Link to="/trainers" className="hover:underline">
            Trainers
          </Link>
          <Link to="/courses" className="hover:underline">
            Courses
          </Link>
          <Link to="/subscriptions" className="hover:underline">
            Subscriptions
          </Link>
        </div>
      </div>
      <div className="relative">
        <img
          src={imageUser}
          alt="Profile"
          className="rounded-full cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          width="35px"
          height="35px"
        />
        {menuOpen && <ProfileMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
