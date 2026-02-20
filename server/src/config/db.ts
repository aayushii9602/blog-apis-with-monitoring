import mongoose from "mongoose";
import logger from "../utils/logger";
const connectDB = async () => {
  try {
    console.log("in connect db")
    console.log(process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Mongo connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectDB;