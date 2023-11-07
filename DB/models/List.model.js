import mongoose, { Schema, Types, model } from "mongoose";
import taskModel from "../models/Task.model.js";

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    boardId: { type: Types.ObjectId, ref: "Board", required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

listSchema.virtual("tasks", {
  localField: "_id",
  foreignField: "listId",
  ref: "Task",
});
// ======== post
listSchema.post(
  "findOneAndDelete",
  async function (doc) {
    console.log("======== post Hook list (findOneAndDelete)=======");
    if (doc?._id) {
    await taskModel.deleteMany({ listId: doc?._id });
    }
  }
)
// ======== post
listSchema.post(
  "deleteMany",
  async function (doc) {
    console.log("======== post Hook list (deleteMany)=======");
    if (doc?._id) {
    await taskModel.deleteMany({ listId: doc?._id });
    }
  }
)

const listModel = mongoose.models.List || model("List", listSchema);

export default listModel;