"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./src/routes/productRoutes"));
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const connection = mysql2_1.default.createConnection(dbConfig);
connection.connect();
// const pool = mysql.createPool({
//   host: "your-mysql-host",
//   user: "your-mysql-username",
//   password: "your-mysql-password",
//   database: "your-mysql-database",
//   connectionLimit: 10,
// });
app.get("/", (req, res) => {
    res.send("Hello! from saib homepage.");
});
app.get("/products", productRoutes_1.default);
app.get("/products/:id", productRoutes_1.default);
app.get("/movies", (req, res) => {
    connection.query("SELECT * from movie", (err, rows, fields) => {
        if (err)
            throw err;
        console.log("The solution is: ", rows);
        res.json(rows);
    });
});
app.listen(port, () => {
    console.log(`type of port is ${typeof port}`);
    console.log(`Sabi express server running on port ${port}`);
});
