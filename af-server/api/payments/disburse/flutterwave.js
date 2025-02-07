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
router.post("/checkout/flutterwave", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { amount, sellerBankInfo, tx_ref } = req.body;
    const { account_bank, account_number, beneficiary_name } = sellerBankInfo;
    const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
    if (!FLW_SECRET_KEY) {
        return res.status(500).json({ error: "Flutterwave secret key is missing in environment variables" });
    }
    if (!account_bank || !account_number || !beneficiary_name) {
        return res.status(400).json({ error: "Seller bank information is incomplete" });
    }
    try {
        const response = yield axios_1.default.post("https://api.flutterwave.com/v3/transfers", {
            account_bank,
            account_number,
            amount,
            currency: "NGN",
            reference: tx_ref,
            narration: "Seller payout",
            beneficiary_name,
            debit_currency: "NGN",
        }, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        if (response.data.status === "success") {
            return res.json({ message: "Transfer successful", data: response.data.data });
        }
        else {
            return res.status(400).json({ error: "Transfer failed", details: response.data });
        }
    }
    catch (error) {
        console.error("Flutterwave API error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        return res.status(500).json({
            error: "Payment processing failed",
            details: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message,
        });
    }
}));
exports.default = router;
