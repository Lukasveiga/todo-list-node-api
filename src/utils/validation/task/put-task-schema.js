const joi = require("joi");

const titleMessage = {
  "string.base": "Title must be a text",
  "string.empty": "Title cannot be empty",
};

const descriptionMessage = {
  "string.base": "Description must be a text",
  "string.empty": "Description cannot be empty",
};

const priorityMessage = {
  "number.base": "Priority must be a number",
  "number.min": "Priority must be between 0 and 5",
  "number.max": "Priority must be between 0 and 5",
  "any.empty": "Priority cannot be empty",
};

const finishedMessage = {
  "boolean.base": "Finished must be true or false",
  "any.empty": "Finished cannot be empty",
};

const genericMessage = {
  "object.missing":
    "You must enter at least one field (title, description, priority or finished)",
};

const putTaskSchema = joi
  .object({
    title: joi.string().messages(titleMessage),
    description: joi.string().messages(descriptionMessage),
    priority: joi.number().min(0).max(5).messages(priorityMessage),
    finished: joi.boolean().messages(finishedMessage),
  })
  .or("title", "description", "priority", "finished")
  .messages(genericMessage);

module.exports = putTaskSchema;
