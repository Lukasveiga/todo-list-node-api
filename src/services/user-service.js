class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(body) {
    const { username, password, email } = body;
    try {
      const newUser = await this.userRepository.create(
        username,
        password,
        email
      );

      delete newUser.password;

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
