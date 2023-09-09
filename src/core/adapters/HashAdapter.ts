import bcrypt from "bcrypt";
import { singleton } from "tsyringe";

@singleton()
export class HashAdapter {
    private saltOrRounds = 12;

    encrypt(value: string): string {
        return bcrypt.hashSync(value, this.saltOrRounds);
    }

    compare(value: string, encryptedValue: string): boolean {
        return bcrypt.compareSync(value, encryptedValue);
    }
}
