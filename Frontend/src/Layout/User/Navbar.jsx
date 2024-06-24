import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <a href="#trainers" className="hover:underline">
          Trainers
        </a>
        <a href="#subscription" className="hover:underline">
          Subscription
        </a>
        <a href="#classes" className="hover:underline">
          Classes
        </a>
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
