const TaskRepository = require("../repositories/task-repository");
const CacheStorage = require("../database/cache/cache-storage");
const TaskService = require("../services/task-service");
const TaskController = require("../controllers/task-controller");

const taskService = new TaskService(new TaskRepository(), new CacheStorage());
const taskController = new TaskController(taskService);

module.exports = taskController;
