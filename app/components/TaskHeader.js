'use client';

import React from 'react';
import {
  TextField,
  Button,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from '@mui/material';
import { Add, Search, FilterList, Flag } from '@mui/icons-material';

export default function TaskHeader({ filters, setFilters, onAddClick }) {
  const { search, status, priority } = filters;

  return (
    <Box className="p-6 bg-white shadow-md rounded-xl mb-6">
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className="min-w-[220px] max-w-[280px] flex-1"
        />

        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <FormControl size="small" className="min-w-[120px]">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              startAdornment={<FilterList className="mr-2" />}
            >
              {['All', 'To Do', 'In Progress', 'Done'].map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" className="min-w-[120px]">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
              startAdornment={<Flag className="mr-2" />}
            >
              {['All', 'Low', 'Medium', 'High'].map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<Add />}
            color="primary"
            onClick={onAddClick}
            className="!bg-gradient-to-r !from-indigo-500 !to-purple-500 !text-white !shadow-md hover:!shadow-lg transition-all duration-200"
          >
            Add Task
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
