import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/trainers" className="hover:underline">
          Trainers
        </Link>
        <Link to="/subscription" className="hover:underline">
          Subscription
        </Link>
        <Link to="/courses" className="hover:underline">
          Classes
        </Link>
      </div>
      <div className="relative">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && <ProfileMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
