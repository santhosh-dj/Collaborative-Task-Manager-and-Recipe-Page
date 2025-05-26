import React, { useState } from 'react';
import { Delete, Edit, Event, Label } from '@mui/icons-material';
import { Avatar, IconButton, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../../store/tasksSlice';
import TaskDeleteConf from './TaskDeleteConf';

const statusColors = {
  'To Do': {
    bgColor: '#E0E7FF',
    selectColor: '#4338CA',

  },
  'In Progress': {
    bgColor: '#FEF3C7',
    selectColor: '#B45309',
  },
  Done: {
    bgColor: '#DCFCE7',
    selectColor: '#15803D',
  },
};

const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

const priorityDots = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

export default function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleStatusChange = (e) => {
    dispatch(updateTask({ ...task, status: e.target.value }));
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteTask(task.id));
    setShowDeleteModal(false);
  };

  const initials = task.assignee
    ? task.assignee
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
    : '';

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white shadow-lg hover:shadow-xl p-4 rounded-lg w-full sm:w-72">
        <div className="flex justify-between items-center mb-1">
          <div
            className={`flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}
          >
            <span className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`} />
            <span>{task.priority}</span>
          </div>

          <Select
            size="small"
            value={task.status}
            onChange={handleStatusChange}
            className="rounded-full px-2 py-0"
            sx={{
              fontSize: '0.75rem',
              minWidth: 80,
              height: 28,
              border: 'none',
              borderRadius: '9999px',
              bgcolor: statusColors[task.status].bgColor,
              color: statusColors[task.status].selectColor,
              fontWeight: '600',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '.MuiSelect-select': {
                padding: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                height: '28px',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '1rem',
                color: statusColors[task.status].selectColor,
              },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  fontSize: '0.75rem',
                },
              },
            }}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </div>

        <h3
          className="font-extrabold text-black text-base mb-1 truncate"
          title={task.title}
        >
          {task.title}
        </h3>

        {task.description && (
          <p
            className="text-gray-500 text-xs mb-2"
            title={task.description}
          >
            {truncateText(task.description, 30)}
          </p>
        )}

        {task.dueDate && (
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <Event fontSize="small" />
            <span>{task.dueDate}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          {task.assignee ? (
            <div className="flex items-center gap-2 max-w-[60%]">
              <Avatar
                sx={{ width: 28, height: 28, fontSize: 13, bgcolor: '#6366f1', color: '#e0e0e0' }}
                alt={task.assignee}
              >
                {initials}
              </Avatar>
              <span
                className="text-gray-600 font-medium truncate max-w-[100px]"
                title={task.assignee}
              >
                {truncateText(task.assignee, 10)}
              </span>
            </div>
          ) : (
            <div />
          )}

          <div className="flex gap-1">
            <IconButton
              onClick={() => onEdit(task)}
              aria-label="Edit Task"
              size="small"
              sx={{
                color: '#2563eb',
                '&:hover': { backgroundColor: '#dbeafe' },
                padding: '4px',
                fontSize: '0.8rem',
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => setShowDeleteModal(true)}
              aria-label="Delete Task"
              size="small"
              sx={{
                color: '#dc2626',
                '&:hover': { backgroundColor: '#fee2e2' },
                padding: '4px',
                fontSize: '0.8rem',
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
      <TaskDeleteConf
        open={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
        message={`Are you sure you want to delete task "${task.title}"?`}
      />
    </div>
  );
}
