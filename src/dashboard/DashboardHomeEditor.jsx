// src/dashboard/DashboardHomeEditor.jsx
import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import ImagePicker from '../components/ImagePicker';

const DashboardHomeEditor = () => {
  const { homeData, updateHomeData } = useAppData();
  const [tempData, setTempData] = useState(homeData);

  // For text fields (title, text)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  // For hero image
  const handleHeroImageChange = (newUrl) => {
    setTempData((prev) => ({ ...prev, heroImage: newUrl }));
  };

  const handleSave = () => {
    updateHomeData(tempData);
    alert('Home data updated!');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Home Page</h2>
      <div className="bg-gray-50 p-4 rounded-md">
        <ImagePicker
          label="Hero Image"
          value={tempData.heroImage}
          onChange={handleHeroImageChange}
        />

        <label className="block mb-2">
          Hero Title:
          <input
            type="text"
            name="heroTitle"
            value={tempData.heroTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-2">
          Hero Text:
          <textarea
            name="heroText"
            value={tempData.heroText}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DashboardHomeEditor;
