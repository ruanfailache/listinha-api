export const Env = {
    ApiPort: Number(process.env.API_PORT),
    JwtSecretKey: process.env.JWT_SECRET_KEY as string,
} as const;
