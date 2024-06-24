import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2">{course.name}</h3>
      <p className="text-gray-700 mb-2">Description: {course.description}</p>
      <p className="text-gray-700 mb-2">Duration: {course.duration} minutes</p>
      <Link
        to={`/course-schedule/${course.id}`}
        className="text-blue-500 hover:underline"
      >
        View Schedule
      </Link>
    </div>
  );
};

export default CourseCard;
