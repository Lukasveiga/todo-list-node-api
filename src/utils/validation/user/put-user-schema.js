const joi = require("joi");

const usernameMessage = {
  "string.empty": "Username cannot be empty",
};

const emailMessage = {
  "string.email": "Invalid email",
  "string.empty": "Email cannot be empty",
};

const passwordMessage = {
  "string.min": "Password must be at least 5 characters long",
  "string.empty": "Password cannot be empty",
};

const genericMessage = {
  "object.missing":
    "You must enter at least one field (username, email, password)",
};

const putUserSchema = joi
  .object({
    username: joi.string().messages(usernameMessage),
    email: joi.string().email().messages(emailMessage),
    password: joi.string().min(5).messages(passwordMessage),
  })
  .or("usename", "email", "password")
  .messages(genericMessage);

module.exports = putUserSchema;
