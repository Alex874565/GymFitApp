import React from "react";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
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
  );
};

export default TrainerCard;
