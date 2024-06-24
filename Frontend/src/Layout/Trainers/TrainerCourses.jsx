import CourseCard from "../Courses/CourseCard";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const TrainerCourses = ({trainerId}) => {
    const [courses, setCourses] = useState([]);
    const [courseSchedules, setCourseSchedules] = useState([])
    const [error, setError] = useState(null);

    const fetchCourses = async () => {
        try {
            const response = await axios.get(
                `https://gymfitapi.azurewebsites.net/odata/Courses?$filter=Trainer_Id eq ${trainerId}`
            );
            console.log("Courses API Response (raw):", response.data);

            const parsedResponse = response.data;
            if (parsedResponse && Array.isArray(parsedResponse.value)) {
                setCourses(parsedResponse.value.filter(course => course.Trainer_Id == trainerId));
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
        <div>
            <h2 className="font-bold mb-4">Courses</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard key={course.ID} course={course}/>
                    ))
                ) : (
                    <p>No courses found</p>
                )}
            </div>
        </div>
    )
}