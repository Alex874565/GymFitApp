import React, { useEffect, useState } from "react";
import axios from "axios";
import {SubscriptionCard} from "./SubscriptionCard";

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
                    "Unexpected response format for courses:",
                    parsedResponse
                );
                setError("Unexpected response format for courses");
            }
        } catch (err) {
            console.error("API Fetch Error for courses:", err);
            setError("Failed to fetch courses");
        }
    };

    useEffect(() => {
        fetchSubscriptions()
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subscriptions.length > 0 ? (
                    subscriptions.map((subscription) => (
                        <SubscriptionCard key={subscription.ID} subscription={subscription}/>
                    ))
                ) : (
                    <p>No courses found</p>
                )}
            </div>
        </div>
    )
}