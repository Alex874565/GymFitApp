import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CourseCard from "../Courses/CourseCard";
import CourseScheduleCard from "../Courses/CourseScheduleCard";
import TrainerCard from "../Trainers/TrainerCard";
import axios from "axios";
import img1 from "../../assets/img1.jpg";

const User = () => {
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([])

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

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

     < div className="container mx-auto p-4">
        <div>
          <img src={img1} alt="" className="w-full h-64 object-cover" />

        </div>

      </div>
    </div>
  );
};

export default User;
