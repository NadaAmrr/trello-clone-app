import { Router } from "express";
import { fileUpload, filesValidation } from "../../utils/multer.js";
import { asyncErrorHandler } from "../../utils/errorHandling.js";
import addTask_SubtaskController from "../commonController/add-task_subtask.js";
import { auth, roles } from "../../middleware/auth.js";

import { deleteSubTask } from "./controller/deleteSubtask.js";

import updateTask_SubtaskController from "../commonController/update-task_subtask.js";
import removeAssignedController from "../commonController/remove-assign-task_subtask.js";
import assignedToController from "../commonController/assign-task_subtask.js";

const router = Router();

router.post(
  "/add",
  auth(Object.values(roles).join()),
  fileUpload(filesValidation.image).fields([
    {
      name: "attachment",
      maxCount: 1,
    },
  ]),
  addTask_SubtaskController
);

router.delete(
  "/delete/:taskId/:subtaskId",
  auth(Object.values(roles).join()),
  asyncErrorHandler(deleteSubTask)

router.put(
  "/update/:id",
  auth(Object.values(roles).join()),
  fileUpload(filesValidation.image).fields([
    {
      name: "attachment",
      maxCount: 1,
    },
  ]),
  updateTask_SubtaskController
);

router.patch(
  "/assign-member/:id/:taskId",
  auth(Object.values(roles).join()),
  assignedToController
  );

router.patch(
  "/remove-member/:id/:taskId",
  auth(Object.values(roles).join()),
  removeAssignedController
);
export default router;
