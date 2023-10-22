const joi = require("joi");

const titleMessage = {
  "any.required": "Title and description are required",
  "string.empty": "Title cannot be empty",
};

const descriptionMessage = {
  "any.required": "Title and description are required",
  "string.empty": "Description cannot be empty",
};

const priorityMessage = {
  "number.base": "Priority must be a number",
  "number.min": "Priority must be between 0 and 5",
  "number.max": "Priority must be between 0 and 5",
  "any.empty": "Priority cannot be empty",
};

const postTaskSchema = joi.object({
  title: joi.string().required().messages(titleMessage),
  description: joi.string().required().messages(descriptionMessage),
  priority: joi.number().min(0).max(5).messages(priorityMessage),
});

module.exports = postTaskSchema;
