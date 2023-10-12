const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("./exceptions");

class AccessToken {
  generate(payload, options) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, options);
    return accessToken;
  }

  validate(token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      return payload;
    } catch (error) {
      throw new UnauthorizedError("Invalid access token");
    }
  }
}

module.exports = AccessToken;
