//@ts-nocheck
import bcrypt from "bcrypt";
import { IUser } from "../models/User";

const getUsersSeed = async () => {
  const password = await bcrypt.hash("whataweirdo", 10);

  return [
    {
      displayName: "MightyPirate69",
      email: "mightypirate@mail.com",
      password,
      avatarUrl: "",
      status: "active",
      authToken: "trustmebro",
    },
    {
      displayName: "NotAGhost",
      email: "lechuck@mail.com",
      password,
      avatarUrl: "",
      status: "active",
      authToken: "youreallyshouldnttrustme",
    },
  ] as IUser[];
}

export default getUsersSeed;