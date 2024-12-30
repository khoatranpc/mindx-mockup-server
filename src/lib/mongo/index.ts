import { commonStatus } from '@/app/api/global';
import mongoose from 'mongoose';


export async function connectToDatabase() {
    if (commonStatus.connectedMongo) {
        console.log('=> Using existing database connection');
        return;
    }
    const uri = String(process.env.NEXT_PUBLIC_MONGO_URI);
    try {
        const db = await mongoose.connect(uri);
        commonStatus.connectedMongo = db.connections[0].readyState === 1;
        console.log('=> Database connected');
    } catch (error) {
        console.error('=> Error connecting to database:', error);
        throw error;
    }
}
