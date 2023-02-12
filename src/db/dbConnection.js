import * as dotenv from "dotenv";
import { mongoose } from "mongoose";

dotenv.config();
mongoose.set("strictQuery", true);

const { DATABASE_URL } = process.env;

export const connectDb = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error while connecting to mongoDb", error.message);
    process.exit(1); //exit with error
  }
};
