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
exports.viewTransactionHistory = exports.fundTransfer = exports.fundWallet = void 0;
const crypto_1 = __importDefault(require("crypto"));
const transactionModel_1 = __importDefault(require("../model/transactionModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const mongoose_1 = require("mongoose");
const fundWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { amount } = req.body;
        const getUser = yield authModel_1.default.findById(userID);
        if (getUser) {
            const ID = crypto_1.default.randomBytes(3).toString("hex");
            yield authModel_1.default.findByIdAndUpdate(userID, {
                wallet: (getUser === null || getUser === void 0 ? void 0 : getUser.wallet) + parseInt(amount),
            }, { new: true });
            const credit = yield transactionModel_1.default.create({
                transactionID: ID,
                amount,
                status: "credit",
                sentBy: "self",
                sentTo: "self",
                balance: (getUser === null || getUser === void 0 ? void 0 : getUser.wallet) + parseInt(amount),
                user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
            });
            getUser === null || getUser === void 0 ? void 0 : getUser.transactionHistory.push(new mongoose_1.Types.ObjectId(credit._id));
            getUser === null || getUser === void 0 ? void 0 : getUser.save();
            return res.status(201).json({
                message: "User account credited successfully",
                data: credit,
                status: 201,
            });
        }
        else {
            return res.status(404).json({ error: "user not found", status: 404 });
        }
    }
    catch (error) {
        return res.status(404).json({ error: error, status: 404 });
    }
});
exports.fundWallet = fundWallet;
const fundTransfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { accNumber, amount, description } = req.body;
        const getUser = yield authModel_1.default.findById(userID);
        const getWhomUser = yield authModel_1.default.findOne({ accNumber });
        if (getUser) {
            const ID = crypto_1.default.randomBytes(3).toString("hex");
            if ((getUser === null || getUser === void 0 ? void 0 : getUser.wallet) > amount) {
                yield authModel_1.default.findByIdAndUpdate(userID, {
                    wallet: (getUser === null || getUser === void 0 ? void 0 : getUser.wallet) - parseInt(amount),
                }, { new: true });
                yield authModel_1.default.findByIdAndUpdate(getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser._id, {
                    wallet: (getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.wallet) + parseInt(amount),
                }, { new: true });
                const debit = yield transactionModel_1.default.create({
                    transactionID: ID,
                    amount,
                    status: "debit",
                    sentBy: `${(getUser === null || getUser === void 0 ? void 0 : getUser.lastName)
                        ? `${getUser === null || getUser === void 0 ? void 0 : getUser.lastName} ${getUser === null || getUser === void 0 ? void 0 : getUser.firstName}`
                        : `${getUser === null || getUser === void 0 ? void 0 : getUser.email}`}`,
                    sentTo: `${(getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.lastName)
                        ? `${getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.lastName} ${getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.firstName}`
                        : `${getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.email}`}`,
                    description,
                    balance: (getUser === null || getUser === void 0 ? void 0 : getUser.wallet) - parseInt(amount),
                    user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                });
                const credit = yield transactionModel_1.default.create({
                    transactionID: ID,
                    amount,
                    status: "credit",
                    sentTo: `${(getUser === null || getUser === void 0 ? void 0 : getUser.lastName)
                        ? `${getUser === null || getUser === void 0 ? void 0 : getUser.lastName} ${getUser === null || getUser === void 0 ? void 0 : getUser.firstName}`
                        : `${getUser === null || getUser === void 0 ? void 0 : getUser.email}`}`,
                    sentBy: `${(getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.lastName)
                        ? `${getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.lastName} ${getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.firstName}`
                        : `${getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.email}`}`,
                    description,
                    balance: (getUser === null || getUser === void 0 ? void 0 : getUser.wallet) + parseInt(amount),
                    user: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                });
                getUser === null || getUser === void 0 ? void 0 : getUser.transactionHistory.push(new mongoose_1.Types.ObjectId(debit._id));
                getUser === null || getUser === void 0 ? void 0 : getUser.save();
                getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.transactionHistory.push(new mongoose_1.Types.ObjectId(credit._id));
                getWhomUser === null || getWhomUser === void 0 ? void 0 : getWhomUser.save();
                return res.status(201).json({
                    message: "amount credit to account successfully",
                    data: debit,
                    status: 201,
                });
            }
            else {
                return res
                    .status(404)
                    .json({ error: "insufficient Funds", status: 404 });
            }
        }
        else {
            return res.status(404).json({ error: "user not found", status: 404 });
        }
    }
    catch (error) {
        return res.status(404).json({ error: error, status: 404 });
    }
});
exports.fundTransfer = fundTransfer;
const viewTransactionHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const history = yield authModel_1.default.findById(userID).populate({
            path: "transactionHistory",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "history found successfully",
            data: history,
            status: 200,
        });
    }
    catch (error) {
        return res.status(404).json({ error: error, status: 404 });
    }
});
exports.viewTransactionHistory = viewTransactionHistory;
