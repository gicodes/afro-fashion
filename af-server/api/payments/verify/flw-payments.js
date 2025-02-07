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
const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
if (!FLW_SECRET_KEY) {
    throw new Error("Flutterwave secret key is missing in environment variables");
}
router.post("/verify-flw-payment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { transaction_id } = req.body;
    if (!transaction_id) {
        return res.status(400).json({ success: false, message: "Transaction ID is required" });
    }
    try {
        const response = yield axios_1.default.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const data = response.data;
        if (data.status === "success") {
            return res.json({ success: true, message: "Payment verified!", data });
        }
        else {
            return res.status(400).json({ success: false, message: "Transaction not found or invalid." });
        }
    }
    catch (error) {
        console.error("Flutterwave Verification Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        return res.status(500).json({
            success: false,
            message: "Server error verifying payment",
            error: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message,
        });
    }
}));
exports.default = router;
