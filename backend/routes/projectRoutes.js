const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { createProject, getProjects } = require('../controllers/projectController');

router.post('/', protect, createProject);
router.get('/', protect, getProjects);

module.exports = router;
