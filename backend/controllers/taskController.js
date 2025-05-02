const Task = require('../models/Task');
const Project = require('../models/Project');

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;

  try {
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({
      title,
      description,
      status,
      project: projectId
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tasks by project
exports.getTasksByProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, user: req.user._id });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');

    if (!task || task.project.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, status } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    if (status === 'completed') {
      task.completedAt = new Date();
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');

    if (!task || task.project.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
