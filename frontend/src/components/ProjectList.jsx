import { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = ({ user, onSelect }) => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');

  const fetchProjects = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setProjects(res.data);
  };

  const handleAdd = async () => {
    if (!name) return;
    await axios.post(`${import.meta.env.VITE_API_URL}/projects`, { name }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setName('');
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow w-full sm:w-1/3">
      <h2 className="text-xl font-semibold mb-2">Projects</h2>
      {projects.map(p => (
        <div key={p._id} className="mb-2 cursor-pointer" onClick={() => onSelect(p)}>
          <div className="p-2 bg-gray-100 rounded hover:bg-gray-200">{p.name}</div>
        </div>
      ))}
      {projects.length < 4 && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="New project name"
            className="p-2 border rounded w-full mb-2"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-1 rounded w-full">
            Add Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
