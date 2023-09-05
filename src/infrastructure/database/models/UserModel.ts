import { DataTypes, Model } from "sequelize";
import { HookReturn } from "sequelize/types/hooks";

import { HashAdapter } from "../../../core/adapters/hash/HashAdapter";
import { Database } from "../../../core/config/database";

class UserModel extends Model {
    declare id: string;
    declare name: string;
    declare email: string;
    declare password: string;
}

UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: Database.getInstance(),
        tableName: "users",
        timestamps: true,
    },
);

UserModel.beforeCreate((user: UserModel): HookReturn => {
    user.password = HashAdapter.encrypt(user.password);
});

UserModel.beforeUpdate((user: UserModel): HookReturn => {
    user.password = HashAdapter.encrypt(user.password);
});

export { UserModel };
