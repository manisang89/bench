const { AppError } = require("../utils/errorHandler");

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("Forbidden: insufficient role", 403));
    }
    next();
  };
};

module.exports = {
  authorizeRoles,
};
