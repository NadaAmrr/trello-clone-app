import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileUpload, filesValidation } from "../../utils/multer.js";
import { boardEndPoint } from "./board.endPoint.js";
import { create } from "../commonController/create.js";
import { update } from "../commonController/update.js";
import { get } from "../commonController/get.js";
import addMemberController from "../commonController/addMember.js";
import deleteMemberController from "../commonController/deleteMember.js";

const router = Router();

router.get("/", auth(boardEndPoint.getBoard), get);

router.post(
  "/",
  auth(boardEndPoint.AddBoard),
  fileUpload(filesValidation.image).fields([
    { name: "coverImages", maxCount: 5 },
  ]),
  create
);

router.put(
  "/:id",
  auth(boardEndPoint.UpdateBoard),
  fileUpload(filesValidation.image).fields([
    { name: "coverImages", maxCount: 5 },
  ]),
  update
);

router.patch(
  "/add-member/:id",
  auth(boardEndPoint.deleteMember),
  addMemberController
);
router.delete(
  "/delete-member/:id",
  auth(boardEndPoint.deleteMember),
  deleteMemberController
);
export default router;
