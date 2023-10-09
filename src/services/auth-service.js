const { NotFoundError, UnauthorizedError } = require("../utils/exceptions");

class Authentication {
  constructor(userRepository, encrypter, accessToken) {
    this.userRepository = userRepository;
    this.encrypter = encrypter;
    this.accessToken = accessToken;
  }

  async login(body) {
    const { username, email, password } = body;

    let user;

    if (username) {
      user = await this.userRepository.finByUsername(username);
    }

    if (email) {
      user = await this.userRepository.finByEmail(email);
    }

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const validPassword = await this.encrypter.compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedError("Unauthorized access");
    }

    const { id } = user;
    const options = { expiresIn: "10m" };
    const validAccessToken = this.accessToken.generateAccessToken(
      { id },
      options
    );

    delete user.password;

    return { user, token: validAccessToken };
  }
}

module.exports = Authentication;
