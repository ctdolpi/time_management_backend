import { Schema, model, Document } from "mongoose";

interface IWorkEntry extends Document {
  userId: Schema.Types.ObjectId;
  description: string;
  date: Date;
  duration: number;
}

const WorkEntrySchema = new Schema<IWorkEntry>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
});

const WorkEntry = model<IWorkEntry>("WorkEntry", WorkEntrySchema);

export default WorkEntry;
