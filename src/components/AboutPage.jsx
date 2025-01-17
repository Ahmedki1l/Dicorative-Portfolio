// src/components/AboutPage.jsx
import React from 'react';
import { useAppData } from '../context/AppDataContext';

const AboutPage = () => {
  const { aboutData } = useAppData();

  return (
    <div className="w-full mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {/* <img
              src={aboutData.profileImage}
              alt="Profile"
              className="h-48 w-full object-cover md:w-48"
            /> */}
          </div>
          <div className="p-8 text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">{aboutData.name}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {aboutData.background}
            </p>
            <div className="border-t border-gray-300 pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
              <ul className="text-gray-700 space-y-1 list-disc list-inside">
                {aboutData.qualifications.map((qual, idx) => (
                  <li key={idx}>{qual}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
