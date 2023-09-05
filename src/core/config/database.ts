import { Sequelize } from "sequelize";

export class Database {
    private static instance: Sequelize;

    private constructor() {}

    static getInstance() {
        if (!Database.instance) {
            const sequelize = new Sequelize("sqlite::memory:");

            sequelize.authenticate().then(async () => {
                console.log("Connection with database has been established successfully!");
                await sequelize.sync({
                    logging: console.log,
                    force: true,
                });
            });

            Database.instance = sequelize;
        }

        return Database.instance;
    }
}
