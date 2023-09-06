export const Env = {
    Database: process.env.DATABASE_URL as string,
    NodeEnv: process.env.NODE_ENV as "dev" | "prod" | "test",
    ApiPort: Number(process.env.API_PORT),
    JwtSecretKey: process.env.JWT_SECRET_KEY as string,
} as const;
