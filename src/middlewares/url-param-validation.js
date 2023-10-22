const urlParamValidation = (req, res, next) => {
  Object.entries(req.params).forEach(([key, value]) => {
    if (!Number(value)) {
      return res.status(400).json({ message: `${key} must to be a number.` });
    }
  });

  return next();
};

module.exports = urlParamValidation;
