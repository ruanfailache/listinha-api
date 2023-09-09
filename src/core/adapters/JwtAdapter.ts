import jwt, { JwtPayload } from "jsonwebtoken";
import { singleton } from "tsyringe";

import { Env } from "../constants/env";

@singleton()
export class JwtAdapter {
    generate(payload: Record<string, unknown>, expiresIn: string) {
        return jwt.sign(payload, Env.JwtSecretKey, {
            expiresIn,
        });
    }

    compare(token: string) {
        return jwt.verify(token, Env.JwtSecretKey) as JwtPayload;
    }
}
