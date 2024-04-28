import mongoose from 'mongoose';

export const connect = async () => {
    if (mongoose.connections[0].readyState) return true;
    const mongoUri = process.env.NEXT_PUBLIC_MONGODB_URI || '';
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
        return true;
    } catch (error) {
        console.error(error);
    }
};
