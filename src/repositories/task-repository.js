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

  async findById(taskId, userId) {
    const task = await taskModel.findOne({
      where: { id: taskId, id_user: userId },
    });

    if (!task) {
      return null;
    }

    return task.get({ plain: true });
  }

  async update(body, taskId, userId) {
    const [updatedRows, [updatedTask]] = await taskModel.update(body, {
      where: {
        id: taskId,
        id_user: userId,
      },
      returning: true,
    });

    if (updatedRows < 1) {
      return null;
    }

    return updatedTask.get({ plain: true });
  }

  async delete(taskId, userId) {
    await taskModel.destroy({
      where: {
        id: taskId,
        id_user: userId,
      },
    });
  }
}

module.exports = TaskRepository;
