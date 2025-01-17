// src/dashboard/DashboardLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home as HomeIcon, User, Camera } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white min-h-[70vh] rounded p-4">
      {/* Side Nav for Dashboard */}
      <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-md mb-4 md:mb-0 md:mr-4">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `inline-flex items-center px-2 py-1 rounded ${
                isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`
            }
          >
            <HomeIcon className="mr-2" size={18} /> Edit Home
          </NavLink>
          <NavLink
            to="/dashboard/about"
            className={({ isActive }) =>
              `inline-flex items-center px-2 py-1 rounded ${
                isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`
            }
          >
            <User className="mr-2" size={18} /> Edit About
          </NavLink>
          <NavLink
            to="/dashboard/projects"
            className={({ isActive }) =>
              `inline-flex items-center px-2 py-1 rounded ${
                isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`
            }
          >
            <Camera className="mr-2" size={18} /> Manage Projects
          </NavLink>
        </nav>
      </div>

      {/* Main dashboard content */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
