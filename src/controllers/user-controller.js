class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    const { username, password, email } = req.body;

    const newUser = await this.userService.create({
      username,
      password,
      email,
    });
    return res.status(201).json(newUser);
  }

  async detailUser(req, res) {
    const userDetails = req.user;
    return res.status(200).json(userDetails);
  }

  async update(req, res) {
    const { username, password, email } = req.body;
    const { id } = req.user;

    const updatedUser = await this.userService.update(
      { username, password, email },
      id
    );
    return res.status(200).json(updatedUser);
  }

  async delete(req, res) {
    const { id } = req.user;

    await this.userService.delete(id);
    return res.status(204).send();
  }
}

module.exports = UserController;
