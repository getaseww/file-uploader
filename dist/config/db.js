"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbDriver = process.env.DB_DRIVER;
const sequelizeConnection = new sequelize_1.Sequelize("file", "root", '', {
    host: 'localhost',
    dialect: "mysql",
});
exports.default = sequelizeConnection;
