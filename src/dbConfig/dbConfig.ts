import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!); // IT WILL ALWAYS HERE
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error. Please make sure db is up and running" +
          error
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    console.log(error);
  }
};
