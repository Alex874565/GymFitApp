import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white bg-opacity-70 rounded-lg p-4 shadow-md backdrop-blur-sm">
      <Link to={`/course-schedule/${course.ID}`}>
        <h3 className="text-xl font-bold mb-2 hover:underline">
          {course.Name}
        </h3>
      </Link>
      <p className="text-gray-700 mb-2">Duration: {course.Duration} minutes</p>
      <p className="text-gray-700 mb-2">Description: {course.Description}</p>
      <p className="text-gray-700 mb-2">Capacity: {course.Capacity}</p>
    </div>
  );
};

export default CourseCard;
