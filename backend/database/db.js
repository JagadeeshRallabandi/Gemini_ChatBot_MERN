import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Db_url, {
        dbName: "ChatBotGemini"
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(error);
  }
}

export default connectDb