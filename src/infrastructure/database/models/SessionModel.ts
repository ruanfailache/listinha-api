import { DataTypes, Model } from "sequelize";

import { Database } from "../../../core/config/database";
import { UserModel } from "./UserModel";

class SessionModel extends Model {
    declare id: string;
    declare token: string;
}

SessionModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: Database.getInstance(),
        tableName: "sessions",
        timestamps: true,
    },
);

UserModel.hasMany(SessionModel, { as: "sessions" });

export { SessionModel };
