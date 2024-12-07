"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const authRouter_1 = __importDefault(require("./router/authRouter"));
const transactionRouter_1 = __importDefault(require("./router/transactionRouter"));
const mainApp = (app) => {
    try {
        app.use("/", (req, res) => {
            res.status(200).json({ message: "Welcome" });
        });
        app.use("/api", authRouter_1.default);
        app.use("/api", transactionRouter_1.default);
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
authRouter_1.default;
