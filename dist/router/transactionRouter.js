"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controller/transactionController");
const router = (0, express_1.Router)();
// PROFILE
router.route("/fund-account-wallet/:userID").post(transactionController_1.fundWallet);
router.route("/transfer-amount/:userID").post(transactionController_1.fundTransfer);
router.route("/transaction-history/:userID/").get(transactionController_1.viewTransactionHistory);
exports.default = router;
