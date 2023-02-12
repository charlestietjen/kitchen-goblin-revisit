import mongoose, { Schema, Types, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  _id: Types.ObjectId;
  displayName: string;
  password: string;
  email: string;
  organization: Types.ObjectId;
  isCorrectPassword: Function;
}

const userSchema = new Schema({
  displayName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatarUrl: {
    type: String,
  },
  status: {
    type: String,
    require: true,
    default: "inactive",
  },
  authToken: {
    type: String,
    // require: true,
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password !== undefined ? (this.password = await bcrypt.hash(this.password, saltRounds)) : (this.password = this.password);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// export const User = model("User", userSchema);
export const User = mongoose.model<IUser>("User", userSchema);
