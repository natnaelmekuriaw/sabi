"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./src/routes/productRoutes"));
const db_config_1 = __importDefault(require("./config/db.config"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_config_1.default.authenticate();
        yield db_config_1.default.sync();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use("/products", productRoutes_1.default);
        app.listen(PORT, () => {
            console.log(`Sabi Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}))();
