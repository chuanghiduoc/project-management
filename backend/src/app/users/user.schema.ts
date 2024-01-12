import { Schema, Types } from 'mongoose';

export const UserSchema = new Schema({
  _id: { type: Types.ObjectId, auto: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projects: [{ type: Types.ObjectId, ref: 'Project' }],
  roles: [{ type: Types.ObjectId, ref: 'Role' }],
  refresh_token: { type: String, default: 'refresh_token' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  projects: Types.ObjectId[];
  roles: Types.ObjectId[];
  refresh_token?: string;
  createdAt: Date;
  updatedAt: Date;
}
