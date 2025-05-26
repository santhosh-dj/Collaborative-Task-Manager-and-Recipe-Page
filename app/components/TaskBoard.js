'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const statusData = {
  'To Do': {
    icon: <AssignmentIcon className="text-sky-600" />,
    bgColor: 'bg-sky-100',
    textColor: 'text-sky-800',
    borderColor: 'border-sky-200',
  },
  'In Progress': {
    icon: <BuildIcon className="text-amber-600" />,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
  },
  'Done': {
    icon: <CheckCircleIcon className="text-emerald-600" />,
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
  },
};

export default function TaskBoard({ filters, onEditTask }) {
  console.log(filters, 'filters');

  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4">
      {Object.keys(statusData)
        .filter((key) => filters.status === 'All' || key === filters.status)
        .map((status) => {
          const { icon, bgColor, textColor, borderColor } = statusData[status];
          return (
            <div
              key={status}
              className={`rounded-xl shadow-md border ${borderColor} p-4`}
            >
              <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-md ${bgColor}`}>
                {icon}
                <h2 className={`text-base font-semibold ${textColor}`}>
                  {status}
                </h2>
              </div>

              <div className="space-y-4">


                {tasks
                  .filter((task) => {
                    const matchesPriority =
                      filters.priority === 'All' || task.priority === filters.priority;
                    const matchesSearch =
                      !filters.search ||
                      task.title.toLowerCase().includes(filters.search.toLowerCase());
                    return task.status === status && matchesPriority && matchesSearch;
                  })
                  .map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                  ))}

              </div>
            </div>
          );
        })}
    </div>
  );
}
