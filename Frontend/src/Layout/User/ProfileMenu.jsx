import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
      <button
        onClick={handleLogout}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
