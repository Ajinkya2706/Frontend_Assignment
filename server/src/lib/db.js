import mongoose from 'mongoose';

const connectDb = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI missing');

  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
  return mongoose.connection;
};

export default connectDb;

