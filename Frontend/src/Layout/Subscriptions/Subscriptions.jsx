import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../User/Navbar";
import img1 from "../../assets/img1.jpg";
import { SubscriptionCard } from "./SubscriptionCard";

export const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(
        "https://gymfitapi.azurewebsites.net/odata/Subscriptions"
      );
      console.log("Subscriptions API Response (raw):", response.data);

      const parsedResponse = response.data;
      if (parsedResponse && Array.isArray(parsedResponse.value)) {
        setSubscriptions(parsedResponse.value);
        console.log("Subscriptions set to:", parsedResponse.value);
      } else {
        console.error(
          "Unexpected response format for subscriptions:",
          parsedResponse
        );
        setError("Unexpected response format for subscriptions");
      }
    } catch (err) {
      console.error("API Fetch Error for subscriptions:", err);
      setError("Failed to fetch subscriptions");
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="relative flex-grow flex items-center justify-center">
        <img
          src={img1}
          alt=""
          className="absolute w-full h-full object-cover blur-sm"
        />
        <div className="absolute w-full h-full bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold my-4 text-center text-white">
            Subscriptions
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center items-center gap-4">
            {subscriptions.length > 0 ? (
              <>
                <SubscriptionCard
                  key={subscriptions[0].ID}
                  subscription={subscriptions[0]}
                  isMiddle={false}
                />
                <SubscriptionCard
                  key={subscriptions[1].ID}
                  subscription={subscriptions[1]}
                  isMiddle={true}
                />
                <SubscriptionCard
                  key={subscriptions[2].ID}
                  subscription={subscriptions[2]}
                  isMiddle={false}
                />
              </>
            ) : (
              <p className="text-white">No subscriptions found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
