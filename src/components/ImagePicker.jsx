// src/components/ImagePicker.jsx
import React, { useState, useEffect } from 'react';
import { uploadToCloudinarySigned } from '../services/CloudinaryService';

/**
 * Optionally, sample images from your public folder
 */
const samplePublicImages = [
  '/images/sample1.jpg',
  '/images/sample2.jpg',
  '/images/sample3.jpg',
];

function ImagePicker({ label, value, onChange }) {
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);

  // Reflect external changes
  useEffect(() => {
    setPreview(value || '');
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1) Signed upload
      const url = await uploadToCloudinarySigned(file);
      // 2) Set preview & notify parent
      setPreview(url);
      onChange(url);
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      alert('Failed to upload. Check console.');
    } finally {
      setUploading(false);
    }
  };

  const handleSelectPublicImage = (imgPath) => {
    setPreview(imgPath);
    onChange(imgPath);
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">{label}</label>

      {preview ? (
        <img
          src={preview}
          alt="Selected"
          className="w-32 h-32 object-cover rounded mb-2 border"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mb-2 rounded">
          <span className="text-gray-500 text-sm">
            {uploading ? 'Uploading...' : 'No image'}
          </span>
        </div>
      )}

      <div className="flex items-center space-x-2 mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>

      {/* Sample images (optional) */}
      <div className="flex flex-wrap gap-2">
        {samplePublicImages.map((img) => (
          <button
            key={img}
            type="button"
            onClick={() => handleSelectPublicImage(img)}
            className="border rounded p-1 hover:bg-gray-100"
          >
            <img
              src={img}
              alt="option"
              className="w-16 h-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImagePicker;
