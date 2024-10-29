const { ValidationError } = require("../utils/errors");
const { isValidDate } = require("../utils/dateHelpers");

const validateDateParams = (req, res, next) => {
  const { referenceDate, endDate } = req.query;

  if (!referenceDate || !endDate) {
    throw new ValidationError("referenceDate and endDate are required.");
  }

  if (!isValidDate(referenceDate) || !isValidDate(endDate)) {
    throw new ValidationError("Invalid date format. Use YYYY-MM format.");
  }

  if (referenceDate >= endDate) {
    throw new ValidationError("referenceDate must be before endDate.");
  }

  next();
};

module.exports = { validateDateParams }