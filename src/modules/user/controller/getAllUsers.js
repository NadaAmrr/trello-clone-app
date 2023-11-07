import { StatusCodes } from "http-status-codes";
import ErrorClass from "../../../utils/errorClass.js";
import { asyncErrorHandler } from "../../../utils/errorHandling.js";
import userModel from "../../../../DB/Models/User.model.js";

export const getAllUsers = asyncErrorHandler(async (req, res, next) => {

  const users = await userModel.find(); // Search for  all users in DB

  // Validate that there is users exist in DB
  if (!users.length) {
    return next(new ErrorClass("There is no user found"), StatusCodes.NOT_FOUND);
  }

  // Return users Data
  return res.status(StatusCodes.ACCEPTED).json({ message: "done", users });
});
