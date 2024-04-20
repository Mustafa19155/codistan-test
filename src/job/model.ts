import mongoose from "mongoose";

export interface IJob extends mongoose.Document {
  data: String;
  status: String;
  result: String;
}

const JobSchema = new mongoose.Schema({
  data: { type: String, required: true },
  status: { type: String, required: true },
  result: { type: String },
});

const Job = mongoose.model<IJob>("Job", JobSchema);

export default Job;
