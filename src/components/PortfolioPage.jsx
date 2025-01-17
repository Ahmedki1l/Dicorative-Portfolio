import React from 'react';
import { useAppData } from '../context/AppDataContext';

const PortfolioPage = () => {
  const { allImages } = useAppData();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-white-900 mb-6">My Work</h1>
      
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allImages.map((imagePath, index) => (
          <div key={index} className="aspect-square relative group">
            <img 
              src={imagePath}
              alt={`Project ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 
                       group-hover:scale-105 group-hover:shadow-xl"
            />
            {/* Optional overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                          transition-all duration-300 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;