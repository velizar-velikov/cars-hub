export const config = {
    port: process.env.PORT || '3000',
    db_connection: process.env.DATABASE_CONNECTION || 'mongodb://localhost: 27017/cars-hub',
};
