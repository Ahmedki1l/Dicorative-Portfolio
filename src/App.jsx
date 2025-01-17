// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Home as HomeIcon, Camera, User, Menu, X } from "lucide-react";

// Public pages
import HomePage from './components/HomePage';
import PortfolioPage from './components/PortfolioPage';
import AboutPage from './components/AboutPage';
import PortfolioDetailPage from './components/PortfolioDetailPage';

// Dashboard pages (no login needed)
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHomeEditor from './dashboard/DashboardHomeEditor';
import DashboardAboutEditor from './dashboard/DashboardAboutEditor';
import DashboardProjects from './dashboard/DashboardProjects';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavButton = ({ to, icon: Icon, label }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `inline-flex items-center px-4 py-2 w-full md:w-auto 
           transition-colors duration-300
           ${
             isActive
               ? 'border-b-2 border-white text-white'
               : 'border-b-2 border-transparent text-gray-300 hover:text-white hover:border-white'
           }`
        }
        onClick={() => setIsMenuOpen(false)}
      >
        <Icon className="mr-2" size={20} />
        {label}
      </NavLink>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Navigation for the PUBLIC site */}
      <nav className="bg-black bg-opacity-60 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:text-black transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:space-x-8">
              <NavButton to="/" icon={HomeIcon} label="Home" />
              <NavButton to="/portfolio" icon={Camera} label="Portfolio" />
              <NavButton to="/about" icon={User} label="About" />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="flex flex-col space-y-2 pb-3">
              <NavButton to="/" icon={HomeIcon} label="Home" />
              <NavButton to="/portfolio" icon={Camera} label="Portfolio" />
              <NavButton to="/about" icon={User} label="About" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:projectId" element={<PortfolioDetailPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Dashboard (no login) */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="home" element={<DashboardHomeEditor />} />
              <Route path="about" element={<DashboardAboutEditor />} />
              <Route path="projects" element={<DashboardProjects />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
