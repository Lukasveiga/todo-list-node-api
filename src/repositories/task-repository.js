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
}

module.exports = TaskRepository;
