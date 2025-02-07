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
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack secret key is missing in environment variables");
}
router.post("/checkout/paystack-transfer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { amount, sellerBankInfo, tx_ref } = req.body;
    const { account_number, bank_code, seller_name } = sellerBankInfo;
    if (!account_number || !bank_code || !seller_name) {
        return res.status(400).json({ error: "Seller bank information is incomplete" });
    }
    try {
        const recipientResponse = yield axios_1.default.post("https://api.paystack.co/transferrecipient", {
            type: "nuban",
            name: seller_name,
            account_number,
            bank_code,
            currency: "NGN",
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const recipient_code = recipientResponse.data.data.recipient_code; // Extract recipient code
        const transferResponse = yield axios_1.default.post("https://api.paystack.co/transfer", {
            source: "balance",
            amount: amount * 100, // Convert amount to kobo
            recipient: recipient_code,
            reason: "Seller payout",
            reference: tx_ref,
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        res.json({
            message: "Transfer successful",
            data: transferResponse.data.data,
        });
    }
    catch (error) {
        console.error("Paystack Transfer API error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        res.status(500).json({
            error: "Payment processing failed",
            details: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message,
        });
    }
}));
exports.default = router;
