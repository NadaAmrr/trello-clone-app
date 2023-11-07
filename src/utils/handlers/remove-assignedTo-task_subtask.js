import taskModel from "../../../DB/models/Task.model.js";
import ErrorClass from "../errorClass.js";
import { StatusCodes } from "http-status-codes";

export const taskType = {
  task: "task",
  subtask: "subtask",
};

export const removeAssigned = (module, type) => {
  return async (req, res, next) => {
    const { id } = req.params; // id of ( task / subtask )
    let { removeAssignedTo } = req.body;
    // case subtask
    if (type.toString() == "subtask") {
      const { taskId } = req.params;
      // Find subtask
      const task = await taskModel.findById(taskId);
      if (!task) {
        return next(new ErrorClass(`Subtask not found`), StatusCodes.NOT_FOUND);
      }
    }
    // Find module( task / subtask)
    const isModule = await module.findById(id);
    if (!isModule) {
      return next(new ErrorClass(`${type} not found`), StatusCodes.NOT_FOUND);
    }
    // check if user is the owner of isModule(task / subtask) to assign to ..
    if (isModule.createdBy.toString() !== req.user._id.toString()) {
      return next(
        new ErrorClass(`UNAUTHORIZED to remove users in ${type}`),
        StatusCodes.UNAUTHORIZED
      );
    }
    if (isModule.assignedTo.length == 0) {
      return next(
        new ErrorClass(
          `No people assigned to ${type} to remove`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    if (
      req.body.removeAssignedTo.every(
        (user) => !isModule.assignedTo.includes(user)
      )
    ) {
      return next(
        new ErrorClass(
          `This users not in ${type} to remove`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    if (removeAssignedTo.length == 0) {
      return next(
        new ErrorClass(
          `Look like not found users to remove from ${type}`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const removed = await module.updateOne(
      {
        _id: id,
      },
      {
        $pullAll: { assignedTo: removeAssignedTo },
      }
    );
    if (!removed) {
      return next(
        new ErrorClass(
          "Did not removed users",
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    }
    return res.status(StatusCodes.OK).json({ message: "Done", removed });
  };
};
