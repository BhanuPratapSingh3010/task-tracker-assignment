import { useState } from 'react';
import axios from 'axios';

const TaskModal = ({ task = {}, user, projectId, onClose }) => {
  const [form, setForm] = useState({
    title: task.title || '',
    description: task.description || '',
    status: task.status || 'pending'
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const url = task._id
      ? `${import.meta.env.VITE_API_URL}/tasks/${task._id}`
      : `${import.meta.env.VITE_API_URL}/tasks`;

    const method = task._id ? 'put' : 'post';
    const data = task._id ? form : { ...form, projectId };

    await axios[method](url, data, {
      headers: { Authorization: `Bearer ${user.token}` }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl mb-4">{task._id ? 'Edit Task' : 'New Task'}</h2>
        <input
          name="title"
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full mb-4 p-2 border rounded"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
