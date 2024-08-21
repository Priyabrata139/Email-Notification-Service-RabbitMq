const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.subject) {
    ErrorResponse.message = "Something went wrong while creating ticket";
    ErrorResponse.error = new AppError(
      ["Subject not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.content) {
    ErrorResponse.message = "Something went wrong while creating ticket";
    ErrorResponse.error = new AppError(
      ["Content not found in the incoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.recepientEmail) {
    ErrorResponse.message = "Something went wrong while creating ticket";
    ErrorResponse.error = new AppError(
      [
        "Recepient email-address not found in the incoming request in the correct form",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
