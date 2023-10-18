class TaskService {
  constructor(taskRepository, cacheStorage) {
    this.taskRepository = taskRepository;
    this.cacheStorage = cacheStorage;
  }
}

module.exports = TaskService;
