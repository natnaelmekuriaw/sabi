import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";

import { ProductAttributes } from "../../types/types";
class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public itemNo!: number;
  public description!: string;
  public quantity!: number;
  public amount!: number;

  static initModel(): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        itemNo: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "product",
        timestamps: false,
      }
    );
  }
}

Product.initModel();

export default Product;
