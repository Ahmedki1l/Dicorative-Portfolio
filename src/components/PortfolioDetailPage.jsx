// src/components/PortfolioDetailPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';

const PortfolioDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects } = useAppData();

  const project = projects.find((p) => p.id === Number(projectId));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project) {
    return (
      <div className="text-white">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <button
          className="mt-4 px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200"
          onClick={() => navigate('/portfolio')}
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="text-white">
      <button
        className="mb-4 px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-200"
        onClick={() => navigate('/portfolio')}
      >
        &larr; Back to Portfolio
      </button>

      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-6">{project.description}</p>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={project.images[currentIndex]}
            alt={`${project.title} - slide ${currentIndex + 1}`}
            className="w-full h-96 object-cover"
          />
        </div>
        {/* Arrows */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2
                     bg-white bg-opacity-70 text-black p-2 rounded-full hover:bg-opacity-100"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2
                     bg-white bg-opacity-70 text-black p-2 rounded-full hover:bg-opacity-100"
        >
          ▶
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {project.images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? 'bg-white' : 'bg-white bg-opacity-40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
