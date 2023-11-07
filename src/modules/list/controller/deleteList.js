import { StatusCodes } from "http-status-codes";
import ErrorClass from "../../../utils/errorClass.js";
import listModel from "../../../../DB/models/List.model.js";
import taskModel from "../../../../DB/models/Task.model.js";

export const deleteList = async (req, res, next) => {
  const { listId } = req.params;
  //find and delete list
  const list = await listModel.findOneAndDelete({
    _id: listId,
    createdBy: req.user._id,
  });
  if (!list) {
    return next(
      new ErrorClass("List not deleted or UNAUTHORIZED to delete list"),
      StatusCodes.BAD_REQUEST
    );
  }
  return res.status(StatusCodes.OK).json({ message: "Done", list });
};
