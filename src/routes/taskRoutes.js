const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all tasks (admin/manager) or user's tasks
router.get('/tasks', authMiddleware(['admin', 'manager', 'user']), taskController.getTasks);

// Get a single task by ID
router.get('/tasks/:id', authMiddleware(['admin', 'manager', 'user']), taskController.getTaskById);

// Create a new task
router.post('/tasks', authMiddleware(['admin', 'manager', 'user']), taskController.createTask);

// Update a task
router.put('/tasks/:id', authMiddleware(['admin', 'manager', 'user']), taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', authMiddleware(['admin', 'manager']), taskController.deleteTask);

// Assign a task to a user
router.put('/tasks/:id/assign', authMiddleware(['admin', 'manager']), taskController.assignTask);

module.exports = router;
