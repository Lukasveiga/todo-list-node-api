const userModel = require("../database/model/user");

class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async create(body) {
    const { username, email, password } = body;

    const newUser = await this.userModel.create({
      username,
      email,
      password,
    });

    return newUser.get({ plain: true });
  }

  async findById(id) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  async findByEmail(email) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  async update(body, id) {
    const [updatedRows, [updatedUser]] = await this.userModel.update(body, {
      where: { id },
      returning: true,
    });

    if (updatedRows < 1) {
      return null;
    }

    return updatedUser.get({ plain: true });
  }

  async delete(id) {
    await this.userModel.destroy({ where: { id } });
  }
}

const userRepository = new UserRepository(userModel);

module.exports = userRepository;
