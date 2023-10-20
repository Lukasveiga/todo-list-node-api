const taskModel = require("../database/model/task");

class TaskRepository {
  async create(body, userId) {
    const { title, description, priority } = body;

    const newTask = await taskModel.create({
      title,
      description,
      priority,
      id_user: userId,
    });

    return newTask.get({ plain: true });
  }

  async findAll(userId) {
    const tasks = await taskModel.findAll({ where: { id_user: userId } });

    return tasks;
  }
}

module.exports = TaskRepository;
