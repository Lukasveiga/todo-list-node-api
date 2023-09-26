class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    const { username, password, email } = req.body;

    const newUser = await this.userService.create({ username, password, email });
    return res.status(201).json(newUser);
  }

  async detailUser(req, res) {
    const userDetails = req.user;
    return res.status(200).json(userDetails);
  }
}
