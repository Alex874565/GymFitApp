import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../User/Navbar";
import TrainerCard from "./TrainerCard";
import trainerBG from "../../assets/trainerBG.jpg";

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
    fetchTrainers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="relative flex-grow">
        <img
          src={trainerBG}
          alt=""
          className="absolute w-full h-full object-cover blur-sm"
        />
        <div className="absolute w-full h-full bg-black opacity-40"></div>
        <div className="relative z-10 flex-grow container mx-auto p-4">
          <h2 className="text-3xl font-bold my-4 text-center text-white">
            Trainers
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trainers.length > 0 ? (
              trainers.map((trainer) => (
                <TrainerCard key={trainer.ID} trainer={trainer} />
              ))
            ) : (
              <p className="text-white">No trainers found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
