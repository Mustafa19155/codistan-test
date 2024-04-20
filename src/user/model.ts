import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
