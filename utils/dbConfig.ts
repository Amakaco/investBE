import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConfig = async () => {
  try {
    await connect(process.env.MONGO_URL_LIVE as string).then(() => {
      console.clear();
      console.log("Connected to MongoDB _LIVE❤️❤️🚀🚀🎮🎮");
    });
  } catch (error) {
    return error;
  }
};
