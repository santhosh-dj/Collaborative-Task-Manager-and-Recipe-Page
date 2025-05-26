'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

export default function TaskList({ filters }) {
  const tasks = useSelector((state) => state.tasks.tasks);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'All' || task.status === filters.status;
    const matchesPriority = filters.priority === 'All' || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {filteredTasks.map((task) => (
        <TaskCard task={task} onEdit={(task) => setEditingTask(task)} />
      ))}
    </div>
  );
}
