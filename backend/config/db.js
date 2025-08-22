import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${client.connection.host}`);
  } catch (error) {
    console.error(`Error while connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
