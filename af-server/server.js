"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const paystack_1 = __importDefault(require("./api/payments/checkout/paystack"));
const paystack_2 = __importDefault(require("./api/payments/disburse/paystack"));
const flw_payments_1 = __importDefault(require("./api/payments/verify/flw-payments"));
const flutterwave_1 = __importDefault(require("./api/payments/disburse/flutterwave"));
const send_congratulatory_email_1 = __importDefault(require("./api/mailing/send-congratulatory-email"));
const send_password_changed_alert_1 = __importDefault(require("./api/mailing/send-password-changed-alert"));
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:3000', process.env.CLIENT_URL];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", send_congratulatory_email_1.default);
app.use("/api", send_password_changed_alert_1.default);
app.use("/api", flw_payments_1.default);
app.use("/api", paystack_1.default);
app.use("/api", paystack_2.default);
app.use("/api", flutterwave_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
