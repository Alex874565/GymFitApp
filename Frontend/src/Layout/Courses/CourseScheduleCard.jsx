import React from "react";

const CourseScheduleCard = ({ schedule }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{schedule.CourseName}</h3>
        <p className="text-gray-700 mb-2">Trainer: {schedule.TrainerName}</p>
        <p className="text-gray-700 mb-2">
          Date: {new Date(schedule.Date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-2">Time: {schedule.Time}</p>
      </div>
    </div>
  );
};

export default CourseScheduleCard;
