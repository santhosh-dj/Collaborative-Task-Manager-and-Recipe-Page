import React from 'react';

export default function TaskDeleteConf({ open, onConfirm, onCancel, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-700 mb-6">
          {message || 'Are you sure you want to delete this task? This action cannot be undone.'}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
