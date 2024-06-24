import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TrainerCourses = ({ trainerId }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `https://gymfitapi.azurewebsites.net/odata/Courses?$filter=Trainer_Id eq ${trainerId}`
      );
      console.log("Courses API Response (raw):", response.data);

      const parsedResponse = response.data;
      if (parsedResponse && Array.isArray(parsedResponse.value)) {
        const trainerCourses = parsedResponse.value.filter(
          (course) => course.Trainer_Id === trainerId
        );
        setCourses(trainerCourses);
        console.log("Courses set to:", trainerCourses);
      } else {
        console.error(
          "Unexpected response format for courses:",
          parsedResponse
        );
        setError("Unexpected response format for courses");
      }
    } catch (err) {
      console.error("API Fetch Error for courses:", err);
      setError("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [trainerId]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Courses</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-2">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.ID}
              className="bg-gray-100 bg-opacity-60 p-2 rounded shadow-md"
            >
              <Link to={`/course-schedule/${course.ID}`}>
                <h3 className="text-md font-bold mb-1 hover:underline">
                  {course.Name}
                </h3>
              </Link>
              <p className="text-gray-700 mb-1">
                Duration: {course.Duration} minutes
              </p>
              <p className="text-gray-700 mb-1">
                Description: {course.Description}
              </p>
              <p className="text-gray-700 mb-1">Capacity: {course.Capacity}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No courses found for this trainer.</p>
        )}
      </div>
    </div>
  );
};

export default TrainerCourses;
