const db = require("../config/db");
import { User } from "../models";
import usersSeed from "./users";
import { skullLog } from "../utils/log";

const seedDB = async () => {
  skullLog("Initializing DB Seed");
  await User.deleteMany({});

  skullLog("Removed all Users");

  await User.insertMany(usersSeed);

  skullLog(`Successfully inserted ${usersSeed.length} users`);
};

seedDB().then(() => {
  db.close();
  skullLog("End of DB Seed");
});
