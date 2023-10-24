const { NotFoundError, UnauthorizedError } = require("../utils/exceptions");

class AuthService {
  constructor(userRepository, encrypter, accessToken, cacheStorage) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
    this.accessToken = accessToken;
    this.cacheStorage = cacheStorage;
  }

  async login(body) {
    const { username, email, password } = body;

    let user;

    if (username) {
      user = await this.userRepository.findByUsername(username);
    }

    if (email) {
      user = await this.userRepository.findByEmail(email);
    }

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const validPassword = await this.encrypter.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedError("Unauthorized access");
    }

    const { id } = user;
    const options = { expiresIn: "5d" };
    const validAccessToken = this.accessToken.generate({ id }, options);

    const userTasks = await this.userRepository.findAllTasks(id);

    this.cacheStorage.setData(`findAll(${id})`, userTasks, { EX: 900 });

    delete user.password;

    return { user, token: validAccessToken };
  }
}

module.exports = AuthService;
