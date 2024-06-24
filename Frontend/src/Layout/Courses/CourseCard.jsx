import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white bg-opacity-70 shadow-md rounded-lg overflow-hidden w-full sm:w-64 mx-auto">
      <Link to={`/course-schedule/${course.ID}`}>
        <h3 className="text-xl font-bold mb-2 hover:underline text-center mx-auto">
          {course.Name}
        </h3>
      </Link>
      <div className="p-4">
        <p className="text-gray-700 mb-2">
          Duration: {course.Duration} minutes
        </p>
        <p className="text-gray-700 mb-2">Description: {course.Description}</p>
        <p className="text-gray-700 mb-2">Capacity: {course.Capacity}</p>
      </div>
    </div>
  );
};

export default CourseCard;
