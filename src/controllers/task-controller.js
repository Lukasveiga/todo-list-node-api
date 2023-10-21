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

  async update(req, res) {
    const { id } = req.user;
    const { taskId } = req.params;
    const { title, description, priority, finished } = req.body;

    const updatedTask = await this.taskService.update(
      { title, description, priority, finished },
      taskId,
      id
    );

    return res.status(200).json(updatedTask);
  }

  async delete(req, res) {
    const { id } = req.user;
    const { taskId } = req.params;

    await this.taskService.delete(taskId, id);

    return res.status(204).send();
  }

  async findAll(req, res) {
    const { id } = req.user;
    const { finished, sortByDate } = req.query;

    const tasks = await this.taskService.findAll({ finished, sortByDate }, id);

    return res.status(200).json(tasks);
  }
}

module.exports = TaskController;
