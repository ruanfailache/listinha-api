export const Env = {
    Database: process.env.DATABASE_URL as string,
    Mode: process.env.MODE as "dev" | "prod" | "test",
    ApiPort: Number(process.env.API_PORT),
    JwtSecretKey: process.env.JWT_SECRET_KEY as string,
} as const;
