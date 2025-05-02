import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import ProjectList from '../components/ProjectList';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Tracker</h1>
        <div>
          <span className="mr-4">Hi, {user.user.name}</span>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <ProjectList user={user} onSelect={setSelectedProject} />
        {selectedProject && <TaskList user={user} project={selectedProject} />}
      </div>
    </div>
  );
};

export default Dashboard;
