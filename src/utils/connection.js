// oxlint-disable no-console
import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI

export async function mongoConnector() {
  try {
    await mongoose.connect(mongo_uri, {
      autoIndex: true,
      family: 4
    })
    console.log("MongoDB is connected")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
  }
}