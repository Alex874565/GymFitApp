import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import img3 from "../../assets/image3.png";

const User = () => {
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [userData, setUserData] = useState({
    Name: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserData({
        Name: decodedToken.Name,
        email: decodedToken.email,
      });
    }

    // Fetch subscription data
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(
          "https://gymfitapi.azurewebsites.net/odata/Subscriptions"
        );
        console.log("Subscriptions API Response (raw):", response.data);

        const parsedResponse = response.data;
        if (parsedResponse && Array.isArray(parsedResponse.value)) {
          setSubscription(parsedResponse.value[0]);
          console.log("Subscription set to:", parsedResponse.value[0]);
        } else {
          console.error(
            "Unexpected response format for subscriptions:",
            parsedResponse
          );
          setError("Unexpected response format for subscriptions");
        }
      } catch (err) {
        console.error("API Fetch Error for subscriptions:", err);
        setError("Failed to fetch subscriptions");
      }
    };

    // Fetch courses data
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

    fetchSubscription();
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="absolute inset-0 flex flex-col">
        <img
          src={img3}
          alt=""
          className="absolute w-full h-full object-cover blur-sm"
        />
        <div className="absolute w-full h-full bg-black opacity-40"></div>
        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="bg-blue-900 bg-opacity-60 p-6 rounded-lg w-1/2 text-white">
            <h1 className="text-4xl font-bold text-center mb-4">
              User Information
            </h1>
            <p>
              <strong>Name:</strong> {userData.Name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <h2 className=" font-bold flex items-center justify-center  underline">
              Subscription Details
            </h2>
            {subscription ? (
              <>
                <p>
                  <strong>Name:</strong> {subscription.Name}
                </p>
                <p>
                  <strong>Description:</strong> {subscription.Description}
                </p>
                <p>
                  <strong>Price:</strong> {subscription.Price}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(subscription.StartDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Duration:</strong> {subscription.Duration}
                </p>
                {subscription.Courses && subscription.Courses.length > 0 ? (
                  <>
                    <h3 className="text-2xl font-bold text-center mt-4">
                      Courses
                    </h3>
                    <ul>
                      {subscription.Courses.map((courseId) => {
                        const course = courses.find((c) => c.ID === courseId);
                        return course ? (
                          <li key={course.ID} className="mt-2">
                            {course.Name}
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </>
                ) : (
                  <p>No courses associated with this subscription.</p>
                )}
              </>
            ) : (
              <p>No subscription details available.</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
