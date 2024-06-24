import React from "react";
import TrainerCourses from "./TrainerCourses";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white bg-opacity-70 shadow-md rounded-lg overflow-hidden w-full sm:w-64 mx-auto">
      <img
        src={trainer.Photo}
        alt={trainer.Name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{trainer.Name}</h3>
        <p className="text-gray-700 mb-2">Age: {trainer.Age}</p>
        <p className="text-gray-700 mb-2">
          Experience: {trainer.Experience} years
        </p>
        <p className="text-gray-700 mb-2">Description: {trainer.Description}</p>
        <p className="text-gray-700 mb-2">Email: {trainer.Email}</p>
      </div>
      <div className="p-4">
        <TrainerCourses trainerId={trainer.ID} />
      </div>
    </div>
  );
};

export default TrainerCard;
