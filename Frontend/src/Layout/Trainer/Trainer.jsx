import React, { useState, useEffect } from 'react';
import Navbar from '../User/Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import img3 from '../../assets/image3.png'; // Make sure this path is correct

export const Trainer = () => {
  const [error, setError] = useState(null);
  const [trainerData, setTrainerData] = useState({
    name: '',
    age: '',
    description: '',
    email: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setTrainerData(prevData => ({
        ...prevData,
        name: decodedToken.name,
        email: decodedToken.email,
      }));
    }

    
    const fetchTrainerData = async () => {
      try {
        const response = await axios.get('https://gymfitapi.azurewebsites.net/odata/Trainers');
        setTrainerData(response.data);
      } catch (err) {
        console.error('API Fetch Error:', err);
        setError('Failed to fetch trainer data');
      }
    };
    fetchTrainerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainerData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gymfitapi.azurewebsites.net/odata/Trainers', trainerData);
      console.log('Submitting:', trainerData);
      // Handle successful update
    } catch (err) {
      console.error('Update Error:', err);
      setError('Failed to update trainer data');
    }
  };

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
              Trainer Information
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-bold">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={trainerData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={trainerData.email}
                  readOnly
                  className="w-full px-3 py-2 text-black rounded bg-gray-200"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block font-bold">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={trainerData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-bold">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={trainerData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-black rounded h-32"
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Save Changes
              </button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;