import mongoose from 'mongoose';

let isConnected = false; // Biến để kiểm tra kết nối

export async function connectToDatabase() {
    if (isConnected) {
        console.log('=> Using existing database connection');
        return;
    }
    const uri = String(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        const db = await mongoose.connect(uri);
        isConnected = db.connections[0].readyState === 1;
        console.log('=> Database connected');
    } catch (error) {
        console.error('=> Error connecting to database:', error);
        throw error;
    }
}
