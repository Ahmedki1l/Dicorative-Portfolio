// src/components/HomePage.jsx
import React from 'react';
import { useAppData } from '../context/AppDataContext';

const HomePage = () => {
  const { homeData } = useAppData();

  return (
    <div className="text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {homeData.heroTitle}
      </h1>
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-4 md:p-6 text-gray-800">
        {/* <img
          src={homeData.heroImage}
          alt="Featured work"
          className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mb-6"
        /> */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          {homeData.heroText}
        </p>
        {/* ... rest of your home content */}
      </div>
    </div>
  );
};

export default HomePage;
