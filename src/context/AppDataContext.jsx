/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllImages } from '../utils/imageUtils';

// Dummy initial data: home, about, and projects
const initialHomeData = {
  heroImage: "/placeholder-hero.jpg",
  heroTitle: "Welcome to My Decoration Services",
  heroText: `أنا فني ومقاول تشطيبات وديكور ماهر ودقيق، أتمتع بخبرة تمتد لأكثر من [عدد السنوات] في تقديم حلول تشطيبات داخلية وخارجية عالية الجودة. متخصص في الطلاء، التبليط، النجارة، الأعمال الكهربائية، السباكة، الجبس بورد، وتركيبات الـ GRC. لدي سجل حافل بإتمام المشاريع في الوقت المحدد وضمن الميزانية وبأعلى معايير الحرفية.
أتميز بخبرة في اختيار المواد وإدارة الفرق وحل المشكلات بطرق مبتكرة، مما يضمن تنفيذ المشاريع بسلاسة مع التركيز على رضا العملاء. هدفي هو تحويل المساحات إلى بيئات وظيفية وجمالية مع الحفاظ على الكفاءة في التكلفة والاستدامة والعناية بالتفاصيل.
`,
};

const initialAboutData = {
  profileImage: "/profile.jpg",
  name: "يحى محمود",
  background: `أنا فني ومقاول تشطيبات وديكور ماهر ودقيق، أتمتع بخبرة تمتد لأكثر من [عدد السنوات] في تقديم حلول تشطيبات داخلية وخارجية عالية الجودة. متخصص في الطلاء، التبليط، النجارة، الأعمال الكهربائية، السباكة، الجبس بورد، وتركيبات الـ GRC. لدي سجل حافل بإتمام المشاريع في الوقت المحدد وضمن الميزانية وبأعلى معايير الحرفية.
أتميز بخبرة في اختيار المواد وإدارة الفرق وحل المشكلات بطرق مبتكرة، مما يضمن تنفيذ المشاريع بسلاسة مع التركيز على رضا العملاء. هدفي هو تحويل المساحات إلى بيئات وظيفية وجمالية مع الحفاظ على الكفاءة في التكلفة والاستدامة والعناية بالتفاصيل.
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
