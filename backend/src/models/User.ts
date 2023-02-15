import mongoose, { Schema, Types, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  _id: Types.ObjectId;
  displayName: string;
  password: string;
  email: string;
  organization: Types.ObjectId;
  verified: boolean;
  isCorrectPassword: Function;
}

const userSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  userCreated: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password !== undefined ? (this.password = await bcrypt.hash(this.password, saltRounds)) : (this.password = this.password);
  }

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const newPassword = this.get("password")
  if (newPassword){
    const saltRounds = 10;
    this.set("password", await bcrypt.hash(newPassword, saltRounds))
  }
  
  next()
})

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// export const User = model("User", userSchema);
export const User = mongoose.model<IUser>("User", userSchema);
