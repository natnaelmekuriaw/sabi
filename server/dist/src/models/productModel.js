"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../../config/db.config"));
class Product extends sequelize_1.Model {
    static initModel() {
        this.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            itemNo: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            },
            amount: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: true,
            },
        }, {
            sequelize: db_config_1.default,
            modelName: "Product",
            timestamps: false,
        });
    }
}
Product.initModel();
exports.default = Product;
