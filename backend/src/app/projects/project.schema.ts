import { Schema, Types } from 'mongoose';

export const ProjectSchema = new Schema({
  _id: { type: Types.ObjectId, auto: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  manager: { type: Types.ObjectId, ref: 'User', required: true },
  tasks: [{ type: Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface Project {
  name: string;
  description: string;
  manager: Types.ObjectId;
  tasks: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
