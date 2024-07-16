import mongoose from "mongoose";

export default async function connect() {
  try {
    const mongoURI = process.env.MONGO;
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    await mongoose.connect(mongoURI);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
