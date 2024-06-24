import {Link, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import {useState} from "react";

export const TrainerDetails = () => {
    const [trainer, setTrainer] = useState(null);
    const {trainerId} = useParams();
    const [error, setError] = useState(null);
    const fetchTrainer = async () => {
        try {
            const response = await axios.get(
                `https://gymfitapi.azurewebsites.net/odata/Trainers?$filter=ID eq '${trainerId}'`
            );
            setTrainer(response.data.value[0]);
            console.log(response);
        } catch (err) {
            console.error("API Fetch Error for course:", err);
            setError("Failed to fetch course");
        }
    };

    useEffect(() => {
        fetchTrainer();
    }, []);

    return (
        <div>
        {trainer &&
        (
        <div>
            <h3 className="text-xl font-bold mb-2">{trainer.Name}</h3>
            <p className="text-gray-700 mb-2">Age: {trainer.Age}</p>
            <p className="text-gray-700 mb-2">
                Experience: {trainer.Experience} years
            </p>
            <p className="text-gray-700 mb-2">Description: {trainer.Description}</p>
            <img
                src={trainer.Photo}
                alt={trainer.Name}
                className="w-24 h-24 object-cover rounded-full"
            />
        </div>
        )}
        </div>
    )
};
