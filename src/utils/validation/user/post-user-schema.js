const joi = require("joi");

const usernameMessage = {
  "any.required": "All fields are required (username, email and password)",
  "string.empty": "Username cannot be empty",
};

const emailMessage = {
  "any.required": "All fields are required (username, email and password)",
  "string.email": "Invalid email",
  "string.empty": "Email cannot be empty",
};

const passwordMessage = {
  "any.required": "All fields are required (username, email and password)",
  "string.min": "Password must be at least 5 characters long",
  "string.empty": "Password cannot be empty",
};

const postUserSchema = joi.object({
  username: joi.string().required().messages(usernameMessage),
  email: joi.string().email().required().messages(emailMessage),
  password: joi.string().min(5).required().messages(passwordMessage),
});

module.exports = postUserSchema;
