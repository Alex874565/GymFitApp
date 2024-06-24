import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Link to={`/course-schedule/${course.ID}`}
            className="text-xl font-bold mb-2">{course.Name}</Link>
      <p className="text-gray-700 mb-2">Description: {course.Description}</p>
      <p className="text-gray-700 mb-2">Duration: {course.Duration} minutes</p>
    </div>
  );
};

export default CourseCard;
