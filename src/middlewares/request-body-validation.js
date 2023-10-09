const requestBodyValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

module.exports = requestBodyValidation;
