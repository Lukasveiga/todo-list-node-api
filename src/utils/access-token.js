const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("./exceptions");

class AccessToken {
  generateAccessToken(payload, options) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, options);
    return accessToken;
  }

  validateAccessToken(token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      return payload;
    } catch (error) {
      throw new UnauthorizedError("Invalid access token");
    }
  }
}

module.exports = AccessToken;
