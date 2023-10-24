const userModel = require("../database/model/user");
const taskModel = require("../database/model/task");

class UserRepository {
  async create(body) {
    const { username, email, password } = body;

    const newUser = await userModel.create({
      username,
      email,
      password,
    });

    return newUser.get({ plain: true });
  }

  async findById(id) {
    const user = await userModel.findByPk(id);

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  async findByEmail(email) {
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  async findByUsername(username) {
    const user = await userModel.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  async findAllTasks(id) {
    const user = await userModel.findAll({
      where: { id },
      include: taskModel,
      plain: true,
    });

    return user.tb_tasks;
  }

  async update(body, id) {
    const [updatedRows, [updatedUser]] = await userModel.update(body, {
      where: { id },
      returning: true,
    });

    if (updatedRows < 1) {
      return null;
    }

    return updatedUser.get({ plain: true });
  }

  async delete(id) {
    await userModel.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
