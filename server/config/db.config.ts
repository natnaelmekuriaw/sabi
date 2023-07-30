// export const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "test_db",
// };

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
