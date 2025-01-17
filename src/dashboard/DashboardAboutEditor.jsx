// src/dashboard/DashboardAboutEditor.jsx
import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import ImagePicker from '../components/ImagePicker';

const DashboardAboutEditor = () => {
  const { aboutData, updateAboutData } = useAppData();
  const [tempAbout, setTempAbout] = useState(aboutData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempAbout((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (newUrl) => {
    setTempAbout((prev) => ({ ...prev, profileImage: newUrl }));
  };

  // Qualifications logic
  const handleQualChange = (index, newValue) => {
    const newQuals = [...tempAbout.qualifications];
    newQuals[index] = newValue;
    setTempAbout((prev) => ({ ...prev, qualifications: newQuals }));
  };

  const handleAddQual = () => {
    setTempAbout((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, '']
    }));
  };

  const handleRemoveQual = (index) => {
    const newQuals = tempAbout.qualifications.filter((_, i) => i !== index);
    setTempAbout((prev) => ({ ...prev, qualifications: newQuals }));
  };

  const handleSave = () => {
    updateAboutData(tempAbout);
    alert('About data updated!');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit About Page</h2>
      <div className="bg-gray-50 p-4 rounded-md">
        <ImagePicker
          label="Profile Image"
          value={tempAbout.profileImage}
          onChange={handleProfileImageChange}
        />

        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={tempAbout.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-2">
          Background:
          <textarea
            name="background"
            rows={3}
            value={tempAbout.background}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <h3 className="font-semibold mt-4 mb-2">Qualifications</h3>
        {tempAbout.qualifications.map((qual, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="text"
              value={qual}
              onChange={(e) => handleQualChange(idx, e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleRemoveQual(idx)}
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQual}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DashboardAboutEditor;
