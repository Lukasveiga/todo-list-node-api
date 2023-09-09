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
}

module.exports = UserRepository;
