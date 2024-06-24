import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import coursesBG from "../../assets/cycling-img.jpg";
import Navbar from "../User/Navbar";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "https://gymfitapi.azurewebsites.net/odata/Courses"
      );
      console.log("Courses API Response (raw):", response.data);

      const parsedResponse = response.data;
      if (parsedResponse && Array.isArray(parsedResponse.value)) {
        setCourses(parsedResponse.value);
        console.log("Courses set to:", parsedResponse.value);
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="absolute inset-0 flex flex-col">
        <img
          src={coursesBG}
          alt="Courses Background"
          className="absolute w-full h-full object-cover blur-sm"
        />
        <div className="relative flex-grow">
          <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold my-4 text-center text-white">
              Courses
            </h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard key={course.ID} course={course} />
                ))
              ) : (
                <p className="text-white text-center">No courses found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
