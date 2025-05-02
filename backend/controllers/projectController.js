const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const existingProjects = await Project.find({ user: req.user._id });

    if (existingProjects.length >= 4) {
      return res.status(400).json({ message: 'Project limit (4) reached' });
    }

    const project = await Project.create({
      name: req.body.name,
      user: req.user._id
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
