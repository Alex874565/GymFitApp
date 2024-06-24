import React from "react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const handleLogout = () => {
    // Logout logic here
    console.log("Logged out");
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
      <Link
        to="/account"
        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Contul meu
      </Link>
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
