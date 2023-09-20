const { BadRequestError } = require("../utils/exceptions");

class UserService {
  constructor(userRepository, encrypter) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
  }

  async create(body) {
    const { username, password, email } = body;
    try {
      const existingUser = await this.userRepository.findByEmail(email);

      if (existingUser) {
        throw new BadRequestError("User already exists.");
      }

      const encryptPassword = await this.encrypter.hash(password);

      const newUser = await this.userRepository.create({
        username,
        password: encryptPassword,
        email,
      });

      delete newUser.password;

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
