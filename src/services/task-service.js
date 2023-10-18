class TaskService {
  constructor(taskRepository, cacheStorage) {
    this.taskRepository = taskRepository;
    this.cacheStorage = cacheStorage;
  }

  async create(body, userId) {
    const { title, description, priority } = body;

    const newTask = await this.taskRepository.create(
      { title, description, priority },
      userId
    );

    await this.cacheStorage.setStaleStatus(`findAll(${userId}):stale`, "true");

    return newTask;
  }
}

module.exports = TaskService;
