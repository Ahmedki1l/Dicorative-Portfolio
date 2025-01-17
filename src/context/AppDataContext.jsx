/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllImages } from '../utils/imageUtils';

// Dummy initial data: home, about, and projects
const initialHomeData = {
  heroImage: "/placeholder-hero.jpg",
  heroTitle: "Welcome to My Decoration Services",
  heroText: `I am a highly experienced and detailoriented Finishing and Decoration
Technician and Contractor with over 37
years of expertise in delivering highquality interior and exterior finishing
solutions. Specializing in painting, tiling,
carpentry, electrical works, plumbing,
gypsum board, and GRC installations, I
have successfully completed numerous
projects with exceptional
craftsmanship, meeting deadlines and
staying within budgets.
With extensive knowledge in material
selection, team management, and
innovative problem-solving, I ensure
seamless project execution while
prioritizing client satisfaction. My goal
is to transform spaces into functional
and aesthetically pleasing
environments with a focus on cost
efficiency, sustainability, and attention
to detail.
`,
};

const initialAboutData = {
  profileImage: "/profile.jpg",
  name: "Yehia Mahmoud",
  background: `I am a highly experienced and detailoriented Finishing and Decoration
Technician and Contractor with over 37
years of expertise in delivering highquality interior and exterior finishing
solutions. Specializing in painting, tiling,
carpentry, electrical works, plumbing,
gypsum board, and GRC installations, I
have successfully completed numerous
projects with exceptional
craftsmanship, meeting deadlines and
staying within budgets.
With extensive knowledge in material
selection, team management, and
innovative problem-solving, I ensure
seamless project execution while
prioritizing client satisfaction. My goal
is to transform spaces into functional
and aesthetically pleasing
environments with a focus on cost
efficiency, sustainability, and attention
to detail.
`,
  qualifications: [
    "Certified Professional Decorator",
    "Advanced Finishing Techniques Specialist",
  ],
};


const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [homeData, setHomeData] = useState(initialHomeData);
  const [aboutData, setAboutData] = useState(initialAboutData);
  const [projects, setProjects] = useState([]);
  const [allImages, setAllImages] = useState([]);

  // Functions to handle updating data
  const updateHomeData = (newHomeData) => {
    setHomeData(newHomeData);
  };

  const updateAboutData = (newAboutData) => {
    setAboutData(newAboutData);
  };

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const updateProject = (updatedProject) => {
    const updatedList = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(updatedList);
  };

  const removeProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  useEffect(() => {
    // Load all images when the component mounts
    async function loadImages() {
      try {
        const images = await getAllImages();
        console.log('All images from the context:', images);

        setAllImages(images);
        
        // Update projects with actual images
        if (images.length > 0) {
          // const updatedProjects = projects.map((project, index) => ({
          //   ...project,
          //   coverImage: images[index % images.length],
          //   images: images.slice(
          //     (index * 3) % images.length,
          //     ((index * 3) + 3) % images.length || images.length
          //   )
          // }));
          setProjects(images);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    }

    loadImages();
  }, []);


  return (
    <AppDataContext.Provider
      value={{
        homeData,
        aboutData,
        projects,
        allImages,
        updateHomeData,
        updateAboutData,
        addProject,
        updateProject,
        removeProject,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
