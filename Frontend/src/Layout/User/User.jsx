import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";
import CourseScheduleCard from "./CourseScheduleCard";
import TrainerCard from "./TrainerCard";
import axios from "axios";
import img1 from "../../assets/img1.jpg";

const User = () => {
  const [courses, setCourses] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    const fetchCourseSchedules = async () => {
      try {
        const response = await axios.get(
          "https://gymfitapi.azurewebsites.net/odata/CourseSchedules"
        );
        console.log("Course Schedules API Response (raw):", response.data);

        const parsedResponse = response.data;
        if (parsedResponse && Array.isArray(parsedResponse.value)) {
          setCourseSchedules(parsedResponse.value);
          console.log("Course Schedules set to:", parsedResponse.value);
        } else {
          console.error(
            "Unexpected response format for course schedules:",
            parsedResponse
          );
          setError("Unexpected response format for course schedules");
        }
      } catch (err) {
        console.error("API Fetch Error for course schedules:", err);
        setError("Failed to fetch course schedules");
      }
    };

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

    fetchCourses();
    fetchCourseSchedules();
    fetchTrainers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto p-4">
        <div>
          <img src={img1} alt="" className="w-full h-64 object-cover" />
          <h2 className="text-2xl font-bold mb-4">Courses</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p>No courses found</p>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold my-4">Course Schedules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courseSchedules.length > 0 ? (
            courseSchedules.map((schedule) => (
              <CourseScheduleCard key={schedule.id} schedule={schedule} />
            ))
          ) : (
            <p>No course schedules found</p>
          )}
        </div>
        <h2 className="text-2xl font-bold my-4">Trainers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trainers.length > 0 ? (
            trainers.map((trainer) => (
              <TrainerCard key={trainer.ID} trainer={trainer} />
            ))
          ) : (
            <p>No trainers found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
