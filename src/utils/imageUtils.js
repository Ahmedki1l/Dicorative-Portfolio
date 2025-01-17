// src/utils/imageUtils.js
import { useState, useEffect } from 'react';

export function getAllImages() {
  // Use Vite's import.meta.glob to get all images
  const imageModules = import.meta.glob('/public/*.{jpg,jpeg,png,gif,webp}', { eager: true });
  
  // Convert the modules object to an array of image paths
  const images = Object.keys(imageModules).map(path => {
    // Remove '/public' from the path
    return path.replace('/public', '');
  });

  console.log('All images:', images);
  
  return images;
}

export function useImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const imageFiles = getAllImages();
      setImages(imageFiles);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  return { images, loading, error };
}