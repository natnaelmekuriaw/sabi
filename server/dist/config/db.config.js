"use strict";
// export const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "test_db",
// };
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("test_db", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});
exports.default = sequelize;
