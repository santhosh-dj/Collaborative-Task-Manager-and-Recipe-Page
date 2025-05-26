'use client';
import React, { useState } from 'react';
import TaskHeader from './components/TaskHeader';
import TaskBoard from './components/TaskBoard';
import TaskForm from './components/TaskForm';
import MainHeader from './components/MainHeader';
import RecipePage from './components/RecipePage';

export default function HomePage() {
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    priority: 'All',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [activePage, setActivePage] = useState('taskManager'); 

  return (
    <main className="max-w-7xl mx-auto p-6 min-h-screen">
      <MainHeader activePage={activePage} setActivePage={setActivePage} />

      {activePage === 'taskManager' && (
        <>
          <TaskHeader
            filters={filters}
            setFilters={setFilters}
            onAddClick={() => setShowAddModal(true)}
          />

          <TaskBoard
            filters={filters}
            onEditTask={(task) => setEditingTask(task)}
          />

          {(showAddModal || editingTask) && (
            <TaskForm
              open={showAddModal || !!editingTask}
              initialData={editingTask}
              handleClose={() => {
                setShowAddModal(false);
                setEditingTask(null);
              }}
            />
          )}
        </>
      )}

      {activePage === 'recipePage' && <RecipePage />}
    </main>
  );
}

