const { BadRequestError, NotFoundError } = require("../utils/exceptions");

class UserService {
  constructor(userRepository, encrypter) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
  }

  async create(body) {
    const { username, password, email } = body;

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
  }

  async findById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    return user;
  }

  async findByEmail(email) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    return user;
  }

  async update(body, id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const { username, email, password } = body;

    const updateParams = {};

    if (username) {
      updateParams.username = username;
    }

    if (email) {
      if (email !== user.email) {
        const existingEmail = await this.userRepository.findByEmail(email);

        if (existingEmail) {
          throw new BadRequestError("Email already registered.");
        }
      }
      updateParams.email = email;
    }

    if (password) {
      updateParams.password = password;
    }

    const updatedUser = await this.userRepository.update(updateParams);

    delete updatedUser.password;

    return updatedUser;
  }
}

module.exports = UserService;