import React from "react";
import { Link } from "react-router-dom";

export const SubscriptionCard = ({ subscription }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <Link to={`/subscription-details/${subscription.ID}`}
                  className="text-xl font-bold mb-2">{subscription.Name}</Link>
            <p className="text-gray-700 mb-2">Description: {subscription.Description}</p>
            <p className="text-gray-700 mb-2">Price: {subscription.Price}</p>
            <p className="text-gray-700 mb-2">Duration: {subscription.Duration} minutes</p>
        </div>
    );
};

