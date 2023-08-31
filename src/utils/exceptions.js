class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, 401);
  }
}

module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
};
