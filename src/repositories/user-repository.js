const User = require("../database/model/user");
const { BadRequestError } = require("../utils/exceptions");

class UserRepository {
  async create(body) {
    const { username, email, password } = body;

    try {
      const newUser = await User.create({
        username,
        email,
        password,
      });

      return newUser.get({ plain: true });
    } catch (error) {
      if ((error.name = "SequelizeUniqueConstraintError")) {
        throw new BadRequestError("Email already exists.");
      }
    }
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
}

module.exports = UserRepository;
