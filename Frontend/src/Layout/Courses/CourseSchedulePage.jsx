import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../User/Navbar";
import scheduleBG from "../../assets/scheduleBG.jpg";

const CourseSchedulePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://gymfitapi.azurewebsites.net/odata/Courses?$filter=ID eq '${courseId}'`
        );
        setCourse(
          response.data.value.filter((course) => course.ID == courseId)[0]
        );
      } catch (err) {
        console.error("API Fetch Error for course:", err);
        setError("Failed to fetch course");
      }
    };

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `https://gymfitapi.azurewebsites.net/odata/CourseSchedules?$filter=ScheduledCourse eq '${courseId}'`
        );
        setSchedules(
          response.data.value.filter(
            (schedule) => schedule.ScheduledCourse == courseId
          )
        );
      } catch (err) {
        console.error("API Fetch Error for schedules:", err);
        setError("Failed to fetch schedules");
      }
    };

    fetchCourse();
    fetchSchedules();
  }, [courseId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEnroll = (scheduleId) => {
    // Logica pentru înscriere la curs
    console.log(`User enrolled in schedule ID: ${scheduleId}`);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="absolute inset-0 flex flex-col">
        <img
          src={scheduleBG}
          alt=""
          className="absolute w-full h-full object-cover blur-sm"
        />
        <div className="absolute w-full h-full bg-black opacity-40"></div>
        <div className="relative z-10 flex-grow container mx-auto p-4 pt-20">
          {error && <p className="text-red-500">{error}</p>}
          {course && (
            <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg mb-6 mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {course.Name}
              </h2>
              <p className="text-gray-700 mb-2 text-center">
                Description: {course.Description}
              </p>
              <p className="text-gray-700 mb-2 text-center">
                Duration: {course.Duration} minutes
              </p>
            </div>
          )}
          <h2 className="text-2xl font-bold my-4 text-center text-white">
            Course Schedule
          </h2>
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="react-calendar"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            {schedules
              .filter((schedule) => {
                var date = new Date(schedule.StartTime).toDateString();
                return date === selectedDate.toDateString();
              })
              .map((schedule) => (
                <div
                  key={schedule.ID}
                  className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg mx-auto w-full max-w-xs mb-4"
                >
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {course.Name}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Trainer: {course.Trainer_Id}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Time: {new Date(schedule.StartTime).toLocaleTimeString()} -{" "}
                    {new Date(schedule.EndTime).toLocaleTimeString()}
                  </p>
                  <button
                    onClick={() => handleEnroll(schedule.ID)}
                    className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded w-full"
                  >
                    Enroll
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSchedulePage;
