import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../User/Navbar";

export const TrainerDetails = () => {
  const [trainer, setTrainer] = useState(null);
  const { trainerId } = useParams();
  const [error, setError] = useState(null);

  const fetchTrainer = async () => {
    try {
      const response = await axios.get(
        `https://gymfitapi.azurewebsites.net/odata/Trainers?$filter=ID eq ${trainerId}`
      );
      setTrainer(response.data.value[0]);
      console.log(response);
    } catch (err) {
      console.error("API Fetch Error for trainer:", err);
      setError("Failed to fetch trainer");
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="relative flex-grow">
        <div className="container mx-auto p-4">
          {trainer ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2 ">{trainer.Name}</h3>
              <p className="text-gray-700 mb-2">Age: {trainer.Age}</p>
              <p className="text-gray-700 mb-2">
                Experience: {trainer.Experience} years
              </p>
              <p className="text-gray-700 mb-2">
                Description: {trainer.Description}
              </p>
              <img
                src={trainer.Photo}
                alt={trainer.Name}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          ) : (
            <p>{error ? error : "Loading..."}</p>
          )}
        </div>
      </div>
    </div>
  );
};
