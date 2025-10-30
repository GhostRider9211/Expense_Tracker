import mongoose from 'mongoose';

const connectDB=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log('Database Connected');
        return conn;
    } catch (error) {
        console.error('Connection Error',error)
        throw error;
    }
};

export default connectDB;