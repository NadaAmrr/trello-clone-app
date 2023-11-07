import taskModel from "../../../DB/models/Task.model.js";
import userModel from "../../../DB/models/user.model.js";
import ErrorClass from "../errorClass.js";
import { StatusCodes } from "http-status-codes";

export const taskType = {
  task: "task",
  subtask: "subtask",
};

export const assignTo = (module, type) => {
  return async (req, res, next) => {
    const { id } = req.params; // id of ( task / subtask )
    let { assignedTo } = req.body;
    // case subtask
    if (type.toString() == "subtask") {
      const { taskId } = req.params;
      // Find subtask
      const task = await taskModel.findById(taskId);
      if (!task) {
        return next(new ErrorClass(`task not found`), StatusCodes.NOT_FOUND);
      }
      // case subtask should all members in task to assign to subtask
      if (
        req.body.assignedTo?.every((user) => !task.assignedTo.includes(user))
      ) {
        return next(
          new ErrorClass(
            `Should all members assign to task to assign in ${type}`
          ),
          StatusCodes.UNAUTHORIZED
        );
      }
      //filter all users not in task
      assignedTo = assignedTo.filter((user) => task.assignedTo.includes(user));
    }
    // Find module( task / subtask)
    const isModule = await module.findById(id);
    if (!isModule) {
      return next(new ErrorClass(`${type} not found`), StatusCodes.NOT_FOUND);
    }
    // check if user is the owner of isModule(task / subtask) to assign to ..
    if (isModule.createdBy.toString() !== req.user._id.toString()) {
      return next(
        new ErrorClass(`UNAUTHORIZED to assign users in ${type}`),
        StatusCodes.UNAUTHORIZED
      );
    }
    // Check if a user assignedTo to this isModule before
    assignedTo = assignedTo.filter(
      (user) => !isModule.assignedTo.includes(user)
    );
    if (assignedTo.length == 0) {
      return next(
        new ErrorClass(
          `Look like this user already found before in ${type}`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const ids = [];
    for (let i = 0; i < assignedTo.length; i++) {
      //check assignedTo .. have account
      const found = await userModel.findById(assignedTo[i].toString());
      if (found) {
        //push assignedTo to ids[]
        ids.push(assignedTo[i]);
      }
    }
    if (ids.length == 0) {
      return next(
        new ErrorClass(
          `Look like  ${req.params.assignedTo.join(
            ", "
          )} already found before or not found users to add in ${type}`,
          StatusCodes.BAD_REQUEST
        )
      );
    }
    const added = await module.updateOne(
      {
        _id: id,
      },
      {
        $push: { assignedTo: ids },
      }
    );
    if (!added) {
      return next(
        new ErrorClass(
          "Did not adding users",
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    }
    return res.status(StatusCodes.OK).json({ message: "Done", added });
  };
};
