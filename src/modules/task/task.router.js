import { Router } from "express";
import { fileUpload, filesValidation } from "../../utils/multer.js";
import { asyncErrorHandler } from "../../utils/errorHandling.js";
import { auth, roles } from "../../middleware/auth.js";
import addTask_SubtaskController from "../commonController/add-task_subtask.js";
import updateTask_SubtaskController from "../commonController/update-task_subtask.js";
import { deleteTask } from "./controller/deleteTask.js";
import assignedToController from "../commonController/assign-task_subtask.js";
import removeAssignedController from "../commonController/remove-assign-task_subtask.js";

const router = Router();

router.post(
  "/add",
  auth(Object.values(roles).join()),
  fileUpload(filesValidation.image).fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "attachment",
      maxCount: 1,
    },
  ]),
  addTask_SubtaskController
);

router.put(
  "/update/:id",
  auth(Object.values(roles).join()),
  fileUpload(filesValidation.image).fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "attachment",
      maxCount: 1,
    },
  ]),
  updateTask_SubtaskController
);

router.delete(
  "/delete/:listId/:taskId",
  auth(Object.values(roles).join()),
  asyncErrorHandler(deleteTask)
);

router.patch(
  "/assign-member/:id",
  auth(Object.values(roles).join()),
  assignedToController
  );

router.patch(
  "/remove-member/:id",
  auth(Object.values(roles).join()),
  removeAssignedController
);
export default router;
