"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authModel = new mongoose_1.Schema({
    accNumber: {
        type: String,
        unique: true,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    wallet: {
        type: Number,
        default: 200,
    },
    transactionHistory: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "transactions",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", authModel);
