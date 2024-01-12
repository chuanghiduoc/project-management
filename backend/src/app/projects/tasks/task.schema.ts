import { Schema, Types } from 'mongoose';

export const TaskSchema = new Schema({
  _id: { type: Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: Types.ObjectId, ref: 'User' },
  project: { type: Types.ObjectId, ref: 'Project', required: true },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'pending'],
    default: 'in-progress',
  },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface Task {
  _id: Types.ObjectId;
  title: string;
  description: string;
  assignedTo?: Types.ObjectId;
  project: Types.ObjectId;
  status: 'in-progress' | 'completed' | 'pending';
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
