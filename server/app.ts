import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./src/routes/productRoutes";

import sequelize from "./config/db.config";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.use(cors());
    app.use(express.json());

    app.use("/products", productRoutes);

    app.listen(PORT, () => {
      console.log(`Sabi Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
