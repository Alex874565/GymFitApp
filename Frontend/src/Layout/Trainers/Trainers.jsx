import TrainerCard from "./TrainerCard";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [error, setError] = useState(null);
    const fetchTrainers = async () => {
        try {
            const response = await axios.get(
                "https://gymfitapi.azurewebsites.net/odata/Trainers"
            );
            console.log("Trainers API Response (raw):", response.data);

            const parsedResponse = response.data;
            if (parsedResponse && Array.isArray(parsedResponse.value)) {
                setTrainers(parsedResponse.value);
                console.log("Trainers set to:", parsedResponse.value);
            } else {
                console.error(
                    "Unexpected response format for trainers:",
                    parsedResponse
                );
                setError("Unexpected response format for trainers");
            }
        } catch (err) {
            console.error("API Fetch Error for trainers:", err);
            setError("Failed to fetch trainers");
        }
    };

    useEffect(() => {
        fetchTrainers()
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Trainers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {trainers.length > 0 ? (
                    trainers.map((trainer) => (
                        <TrainerCard key={trainer.ID} trainer={trainer}/>
                    ))
                ) : (
                    <p>No trainers found</p>
                )}
            </div>
        </div>
    )
}