import mongoose from 'mongoose';
import { config } from './config';
import '../models/User';
import '../models/Car';

export async function databaseConfig() {
    const connectionString = config.db_connection as string;

    mongoose.connection.on('connected', () => console.log(`Database connected to: ${config.db_connection}`));
    mongoose.connection.on('error', () => console.log(`Error connecting to database: ${config.db_connection}`));

    await mongoose.connect(connectionString);
}
