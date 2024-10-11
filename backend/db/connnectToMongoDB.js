import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(
      `\n MONGODB connected`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED", error);
  }
};


export default connectToMongoDB;