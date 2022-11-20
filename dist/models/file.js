"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class File extends sequelize_1.Model {
}
File.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    fileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fileSize: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: db_1.default,
    paranoid: true
});
exports.default = File;
