"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionModel = new mongoose_1.Schema({
    sentBy: {
        type: String,
    },
    sentTo: {
        type: String,
    },
    status: {
        type: String,
    },
    transactionID: {
        type: String,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
    },
    balance: {
        type: Number,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("transactions", transactionModel);
