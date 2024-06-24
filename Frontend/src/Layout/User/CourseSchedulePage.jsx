import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
          `https://gymfitapi.azurewebsites.net/odata/Courses(${courseId})`
        );
        setCourse(response.data);
      } catch (err) {
        console.error("API Fetch Error for course:", err);
        setError("Failed to fetch course");
      }
    };

    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `https://gymfitapi.azurewebsites.net/odata/CourseSchedules?$filter=scheduledCourse/id eq ${courseId}`
        );
        setSchedules(response.data.value);
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
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {course && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
          <p className="text-gray-700 mb-2">
            Description: {course.description}
          </p>
          <p className="text-gray-700 mb-2">
            Duration: {course.duration} minutes
          </p>
        </div>
      )}
      <h2 className="text-2xl font-bold my-4">Course Schedule</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="mb-6"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {schedules
          .filter(
            (schedule) =>
              new Date(schedule.startTime).toDateString() ===
              selectedDate.toDateString()
          )
          .map((schedule) => (
            <div
              key={schedule.id}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">
                {schedule.scheduledCourse.name}
              </h3>
              <p className="text-gray-700 mb-2">
                Trainer: {schedule.scheduledCourse.trainer.name}
              </p>
              <p className="text-gray-700 mb-2">
                Time: {new Date(schedule.startTime).toLocaleTimeString()} -{" "}
                {new Date(schedule.endTime).toLocaleTimeString()}
              </p>
              <button
                onClick={() => handleEnroll(schedule.id)}
                className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
              >
                Enroll
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseSchedulePage;
