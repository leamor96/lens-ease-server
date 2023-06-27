import mongoose from "mongoose";
import dbConfig from "./config/db.config.js";
import { Role } from "./models/role.js";
import dotenv from "dotenv";

dotenv.config();

const { DB, ROLES } = dbConfig;

const connect = async () => {
  mongoose.set("strictQuery", false);
 
  await mongoose.connect(
   process.env.MONGO_URI
  );
  console.log(`Succesfully connected to the database ${DB}`);
  initDB();
};

const initDB = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      const roles = ROLES.map((r) => new Role({ name: r }));
      for (let role of roles) {
        await role.save();
        console.log("added ", role.name, "to Roles collection");
      }
    }
  } catch (e) {
    console.log("Failed with error: ", e);
  }
};

export { connect };
