import CourseCard from "../Courses/CourseCard";
import React from "react";

export const TrainerCourses = ({trainerId}) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
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