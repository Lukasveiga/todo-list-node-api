const joi = require("joi");

const usernameMessage = {
  "string.empty": "Username cannot be empty",
};

const emailMessage = {
  "string.email": "Invalid email",
  "string.empty": "Email cannot be empty",
};

const passwordMessage = {
  "any.required": "Password must be provided",
};

const genericMessage = {
  "object.missing": "You must enter with username or email",
};

const postLoginSchema = joi
  .object({
    username: joi.string().messages(usernameMessage),
    email: joi.string().email().messages(emailMessage),
    password: joi.string().required().messages(passwordMessage),
  })
  .or("username", "email")
  .messages(genericMessage);

module.exports = postLoginSchema;
