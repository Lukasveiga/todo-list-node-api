class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  async create(req, res) {
    const { id } = req.user;
    const { title, description, priority } = req.body;

    const newTask = await this.taskService.create(
      { title, description, priority },
      id
    );

    return res.status(201).json(newTask);
  }
}

module.exports = TaskController;
