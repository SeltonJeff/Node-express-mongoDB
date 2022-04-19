import { Schema, model, Document } from "mongoose";

interface UserInterface extends Document {
  email?: String;
  firstName?: String;
  lastName?: String;
  password?: String;
  createdAt?: String;
  updatedAt?: String;
}

const UserSchema = new Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export default model<UserInterface>("user", UserSchema);
