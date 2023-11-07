import subTaskModel from "../../../../DB/models/SubTask.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import ErrorClass from "../../../utils/errorClass.js";
import { StatusCodes } from "http-status-codes";

export const deleteSubTask = async (req, res, next) => {
  const { subtaskId } = req.params;
  // Find subtask and delete by user that created subtask
  const subTask = await subTaskModel.findOneAndDelete({
    _id: subtaskId,
    createdBy: req.user._id,
  });
  if (!subTask) {
    return next(
      new ErrorClass("Subtask not found or UNAUTHORIZED to delete subtask"),
      StatusCodes.UNAUTHORIZED
    );
  }
  return res.status(StatusCodes.OK).json({ message: "Done", subTask });
};
