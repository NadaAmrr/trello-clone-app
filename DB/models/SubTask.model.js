import { Schema, Types, model } from "mongoose";
import { imageSchema } from "../DB_Utils/imageSchema.js";
import cloudinary from "../../src/utils/cloudinary.js";
import taskModel from "../models/Task.model.js";

const subTaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["completed", "unCompleted"],
      default: "unCompleted",
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    assignedTo: [{ type: Types.ObjectId, ref: "User", required: true }],
    taskId: { type: Types.ObjectId, ref: "Task", required: true },
    attachment: imageSchema,
  },
  {
    timestamps: true,
  }
);

subTaskSchema.virtual("task", {
  localField: "_id",
  foreignField: "taskId",
  ref: "Task",
});

//======== post "findOneAndDelete"
subTaskSchema.post(["findOneAndDelete"], async function (doc) {
  console.log(
    "======== post Hook subtask (findOneAndDelete)======="
  );
  // Delete subtask attachment from cloudinary
  if (doc.attachment?.public_id) {
    await cloudinary.uploader.destroy(doc.attachment.public_id)
  }
});
//======== pre deleteMany
subTaskSchema.pre("deleteMany", async function () {
  console.log("======== pre Hook subtask (deleteMany) =======");
  const customId = this.getFilter().customId;
  // Find subtasks
  const subTasks =
   await subTaskModel.find({
          taskId: this.getFilter().taskId,
        });
  if (subTasks.length) {
    // delete attachment of subtasks from cloudinary
    for (const ele of subTasks) {
      // Delete all subtasks attachments from cloudinary
      if (ele.attachment) {
        console.log(`internship/task/${customId}/subtask`);
        await cloudinary.api.delete_resources_by_prefix(
          `internship/task/${customId}/subtask/`
        );
      }
    }
    // delete the folder of subtasks
    await cloudinary.api.delete_folder(
      `internship/task/${customId}/subtask`
    );
  }
});

const subTaskModel = model("SubTask", subTaskSchema);
export default subTaskModel;
