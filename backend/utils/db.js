import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo DB Connected Successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

export default connectDB;

