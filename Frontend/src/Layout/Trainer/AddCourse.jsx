import React, { useState } from 'react';
import Navbar from '../User/Navbar';
import axios from 'axios';
import img3 from '../../assets/image3.png';

export const AddCourse = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [courseData, setCourseData] = useState({
    Name: '',
    Duration: '',
    Description: '',
    Capacity: '',
    Trainer_ID: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const dataToSubmit = {
        ...courseData,
        Duration: parseInt(courseData.Duration),
        Capacity: parseInt(courseData.Capacity),
        Trainer_Id: parseInt(courseData.Trainer_Id)
      };
      const response = await axios.post('/odata/Courses', dataToSubmit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Course added successfully:', response.data);
      setSuccess(`Course "${response.data.Name}" added successfully with ID: ${response.data.ID}`);
      setError(null);
      
      setCourseData({
        Name: '',
        Duration: '',
        Description: '',
        Capacity: '',
        Trainer_ID: ''
      });
    } catch (err) {
      console.error('Add Course Error:', err);
      setError(err.response?.data?.message || 'Failed to add course. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="absolute inset-0 flex flex-col">
        <img src={img3} alt="" className="absolute w-full h-full object-cover blur-sm" />
        <div className="absolute w-full h-full bg-black opacity-40"></div>
        <div className="relative z-10 flex-grow flex items-center justify-center">
          <div className="bg-blue-900 bg-opacity-60 p-6 rounded-lg w-1/2 text-white">
            <h1 className="text-4xl font-bold text-center mb-4">Add New Course</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="Trainer_Id" className="block font-bold">Trainer ID:</label>
                <input
                  type="number"
                  id="Trainer_Id"
                  name="Trainer_Id"
                  value={courseData.Trainer_Id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Name" className="block font-bold">Name:</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={courseData.Name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Duration" className="block font-bold">Duration (minutes):</label>
                <input
                  type="number"
                  id="Duration"
                  name="Duration"
                  value={courseData.Duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Description" className="block font-bold">Description:</label>
                <textarea
                  id="Description"
                  name="Description"
                  value={courseData.Description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded h-32"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Capacity" className="block font-bold">Capacity:</label>
                <input
                  type="number"
                  id="Capacity"
                  name="Capacity"
                  value={courseData.Capacity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Add Course
              </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;