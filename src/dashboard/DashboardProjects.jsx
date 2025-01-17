// src/dashboard/DashboardProjects.jsx
import React, { useState } from 'react';
import { useAppData } from '../context/AppDataContext';
import ImagePicker from '../components/ImagePicker';

const DashboardProjects = () => {
  const { projects, addProject, updateProject, removeProject } = useAppData();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    coverImage: '',
    images: [],
  });

  // For cover image
  const handleCoverChange = (cloudUrl) => {
    setNewProject((prev) => ({ ...prev, coverImage: cloudUrl }));
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) {
      alert('Title is required.');
      return;
    }
    const newId = projects.length
      ? Math.max(...projects.map((p) => p.id)) + 1
      : 1;

    addProject({ id: newId, ...newProject });
    setNewProject({
      title: '',
      description: '',
      coverImage: '',
      images: [],
    });
    setShowAddForm(false);
  };

  // Very basic edit approach using prompt
  const handleEditProject = (project) => {
    const updatedTitle = prompt('New Title:', project.title);
    if (updatedTitle === null) return;

    const updatedDesc = prompt('New Description:', project.description);
    if (updatedDesc === null) return;

    updateProject({
      ...project,
      title: updatedTitle,
      description: updatedDesc,
    });
  };

  // Additional images as text (optional)
  const [imageInput, setImageInput] = useState('');

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setNewProject((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setNewProject((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        {showAddForm ? 'Cancel' : 'Add Project'}
      </button>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="font-semibold mb-2">New Project</h3>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={newProject.title}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </label>
          <label className="block mb-2">
            Description:
            <textarea
              className="w-full p-2 border rounded mt-1"
              value={newProject.description}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </label>

          <ImagePicker
            label="Cover Image"
            value={newProject.coverImage}
            onChange={handleCoverChange}
          />

          <div className="mt-2">
            <h4 className="font-semibold mb-2">Additional Images</h4>
            <div className="flex space-x-2 my-2">
              <input
                type="text"
                className="flex-grow p-2 border rounded"
                placeholder="Image URL or Base64"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
              />
              <button
                onClick={handleAddImage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {newProject.images.map((img, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="flex-grow text-sm">{img}</span>
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          >
            Save Project
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <img
              src={p.coverImage}
              alt={p.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-gray-800">{p.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{p.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditProject(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => removeProject(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProjects;
