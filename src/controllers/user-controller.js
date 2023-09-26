class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    const { username, password, email } = req.body;

    const newUser = await this.userService.create({ username, password, email });
    return res.status(201).json(newUser);
  }
}
