const User = require("../database/model/user");

class UserRepository {
  async create(body) {
    const { username, email, password } = body;

    const newUser = await User.create({
      username,
      email,
      password,
    });

    return newUser.get({ plain: true });
  }

  async findById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user.get({ plain: true });
  }

  async update(body, id) {
    const [updatedRows, [updatedUser]] = await User.update(body, {
      where: { id },
      returning: true,
    });

    if (updatedRows < 1) {
      return null;
    }

    return updatedUser.get({ plain: true });
  }

  async delete(id) {
    await User.destroy({ where: { id } });
  }
}

module.exports = UserRepository;
