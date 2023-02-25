const db = require("../config/db");
import { User } from "../models";
import getUsersSeed from "./users";
import { skullLog } from "../utils/log";

const seedDB = async () => {
  skullLog("Initializing DB Seed");
  await User.deleteMany({});

  skullLog("Removed all Users");

  const newUsers = await getUsersSeed();

  await User.insertMany(newUsers);

  skullLog(`Successfully inserted ${newUsers.length} users`);
};

seedDB().then(() => {
  db.close();
  skullLog("End of DB Seed");
});
