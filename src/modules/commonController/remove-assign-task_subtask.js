import taskModel from "../../../DB/models/Task.model.js";
import subTaskModel from "../../../DB/models/SubTask.model.js";
import { asyncErrorHandler } from "../../utils/errorHandling.js";
import { removeAssigned, taskType } from "../../utils/handlers/remove-assignedTo-task_subtask.js";

const removeAssignedController = asyncErrorHandler(async (req, res, next) => {
  if (req.originalUrl.includes("subtask"))
  removeAssigned(subTaskModel, taskType.subtask)(req, res, next);
  else removeAssigned(taskModel, taskType.task)(req, res, next);
});
export default removeAssignedController;
