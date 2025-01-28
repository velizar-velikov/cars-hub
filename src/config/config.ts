type Config = {
    port: string;
    db_connection: string;
    salt_rounds: number;
};

export const config: Config = {
    port: process.env.PORT || '3000',
    db_connection: process.env.DATABASE_CONNECTION || 'mongodb://localhost: 27017/cars-hub',
    salt_rounds: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10,
};
