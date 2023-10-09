const { hash, compare } = require("bcrypt");

class Encrypter {
  async hash(password) {
    const saltRounds = 10;

    const passwordEncrypted = await hash(password, saltRounds);

    return passwordEncrypted;
  }

  async compare(providedPassword, userPassword) {
    const validPassword = await compare(providedPassword, userPassword);
    return validPassword;
  }
}

module.exports = Encrypter;
