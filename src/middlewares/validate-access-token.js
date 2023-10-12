const AccessToken = require("../utils/access-token");
const UserRepository = require("../repositories/user-repository");
const { UnauthorizedError } = require("../utils/exceptions");

const accessToken = new AccessToken();
const userRepository = new UserRepository();

const validateAcessToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Unauthorized access");
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = accessToken.validate(token);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedError("Unauthorized access");
    }

    delete user.password;

    req.user = user;

    next();
  } catch (error) {
    throw new UnauthorizedError("Unauthorized access");
  }
};

module.exports = validateAcessToken;
