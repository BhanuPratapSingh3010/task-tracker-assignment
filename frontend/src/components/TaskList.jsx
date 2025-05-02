import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskModal from './TaskModal';

const TaskList = ({ user, project }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${project._id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    if (project) fetchTasks();
  }, [project]);

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    fetchTasks();
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full sm:w-2/3">
      <h2 className="text-xl font-semibold mb-2">Tasks in {project.name}</h2>
      <button onClick={() => setEditingTask({})} className="mb-4 bg-green-600 text-white px-3 py-1 rounded">
        + Add Task
      </button>
      {tasks.map(t => (
        <div key={t._id} className="border p-2 rounded mb-2 flex justify-between items-center">
          <div>
            <p className="font-medium">{t.title}</p>
            <p className="text-sm text-gray-500">{t.status}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditingTask(t)} className="text-blue-600">Edit</button>
            <button onClick={() => handleDelete(t._id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
      {editingTask && (
        <TaskModal
          task={editingTask}
          projectId={project._id}
          user={user}
          onClose={() => {
            setEditingTask(null);
            fetchTasks();
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
