type Config = {
    port: string;
    db_connection: string;
    salt_rounds: number;
    cookie_name: string;
    secret: string;
    token_exp_time: string;
};

export const config: Config = {
    port: process.env.PORT || '3000',
    db_connection: process.env.DATABASE_CONNECTION || 'mongodb://localhost: 27017/cars-hub',
    salt_rounds: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10,
    cookie_name: process.env.COOKIE_NAME || 'user',
    secret: process.env.SECRET as string,
    token_exp_time: process.env.TOKEN_EXP_TIME as string,
};
