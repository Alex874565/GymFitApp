import React from "react";
import { Link } from "react-router-dom";

export const SubscriptionCard = ({ subscription, isMiddle }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-lg ${
        isMiddle
          ? "w-80 h-80 bg-blue-700 text-white bg-opacity-70"
          : "w-64 h-64 bg-white bg-opacity-70"
      } flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105`}
    >
      <Link
        to={`/subscription-details/${subscription.ID}`}
        className="text-xl font-bold mb-2 hover:underline text-center"
      >
        {subscription.Name}
      </Link>
      <div className="p-4 text-center">
        <p
          className={`mb-2 font-bold ${
            isMiddle ? "text-[#ea6c0dff]" : "text-gray-700"
          }`}
        >
          {subscription.Description}
        </p>
        <p className={`mb-2 ${isMiddle ? "text-white" : "text-gray-700"}`}>
          Price: {subscription.Price}$
        </p>
        <p className={`mb-2 ${isMiddle ? "text-white" : "text-gray-700"}`}>
          Duration: {subscription.Duration} days
        </p>
      </div>
    </div>
  );
};
