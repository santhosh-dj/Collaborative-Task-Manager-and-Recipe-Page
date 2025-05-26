'use client';

import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default function MainHeader({ activePage, setActivePage }) {
  return (
    <header className="w-full mb-8 border-b border-gray-200">
      <nav className="flex flex-wrap justify-center gap-4 p-4 bg-white shadow-sm rounded-lg">
        <button
          onClick={() => setActivePage('taskManager')}
          className={`flex items-center gap-2 transition px-5 py-2 rounded-full font-medium text-sm sm:text-base
            ${activePage === 'taskManager' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'}`}
        >
          <AssignmentIcon fontSize="small" />
          Task Manager
        </button>

        <button
          onClick={() => setActivePage('recipePage')}
          className={`flex items-center gap-2 transition px-5 py-2 rounded-full font-medium text-sm sm:text-base
            ${activePage === 'recipePage' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'}`}
        >
          <RestaurantMenuIcon fontSize="small" />
          Recipe Page
        </button>
      </nav>
    </header>
  );
}
