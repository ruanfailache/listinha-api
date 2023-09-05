import bcrypt from "bcrypt";

export class HashAdapter {
    private static saltOrRounds = 12;

    private constructor() {}

    static encrypt(value: string): string {
        return bcrypt.hashSync(value, this.saltOrRounds);
    }

    static compare(value: string, encryptedValue: string): boolean {
        return bcrypt.compareSync(value, encryptedValue);
    }
}
