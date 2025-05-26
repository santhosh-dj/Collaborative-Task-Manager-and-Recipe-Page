'use client';

import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../store/tasksSlice';
import { v4 as uuidv4 } from 'uuid';

const schema = z.object({
  title: z.string().min(3, 'Title should be at least 3 characters'),
  description: z.string({ required_error: 'Description is required' }).nonempty('Description is required'),
  status: z.enum(['To Do', 'In Progress', 'Done']),
  priority: z.enum(['Low', 'Medium', 'High']),
  dueDate: z
    .string({ required_error: 'Due date is required' })
    .refine((dateStr) => {
      const now = new Date();
      const date = new Date(dateStr);
      return date > now;
    }, {
      message: 'Due date must be later than today.',
    }),
  assignee: z.string({ required_error: 'Assignee is required' }).nonempty('Assignee is required'),
});

const statusOptions = ['To Do', 'In Progress', 'Done'];
const priorityOptions = ['Low', 'Medium', 'High'];

export default function TaskForm({ open, handleClose, initialData = null }) {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '',
      assignee: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'To Do',
        priority: initialData.priority || 'Medium',
        dueDate: initialData.dueDate || '',
        assignee: initialData.assignee || '',
      });
    } else {
      reset({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
        dueDate: '',
        assignee: '',
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    if (initialData) {
      dispatch(
        updateTask({
          id: initialData.id,
          ...data,
        })
      );
    } else {
      dispatch(
        addTask({
          id: uuidv4(),
          ...data,
        })
      );
    }
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-center text-indigo-600 font-bold text-2xl">
        {initialData ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="task-form">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title *"
                variant="outlined"
                fullWidth
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ''}
                autoFocus
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description ? errors.description.message : ''}
              />
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Status *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.status}
                  helperText={errors.status ? errors.status.message : ''}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Priority *"
                  variant="outlined"
                  fullWidth
                  error={!!errors.priority}
                  helperText={errors.priority ? errors.priority.message : ''}
                >
                  {priorityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>

          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="Due Date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.dueDate}
                helperText={errors.dueDate ? errors.dueDate.message : ''}
              />
            )}
          />

          <Controller
            name="assignee"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Assignee"
                variant="outlined"
                fullWidth
                placeholder="Enter user name"
                error={!!errors.assignee}
                helperText={errors.assignee ? errors.assignee.message : ''}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions className="px-6 pb-4 justify-between">
        <Button
          onClick={handleClose}
          className="border border-gray-400 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-100 transition-all duration-150"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="task-form"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 !text-white px-6 py-2 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          disabled={isSubmitting}
        >
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>

      </DialogActions>

    </Dialog>
  );
}
