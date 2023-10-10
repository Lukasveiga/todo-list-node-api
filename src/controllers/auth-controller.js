class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res) {
    const { username, email, password } = req.body;

    const loggedUserInfo = await this.authService.login({
      username,
      email,
      password,
    });

    return res.status(200).json(loggedUserInfo);
  }
}

module.exports = AuthController;
