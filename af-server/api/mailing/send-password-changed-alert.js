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
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = express_1.default.Router();
router.post("/send-password-changed-alert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT),
        secure: false, // true for port 465, false for others
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    const mailOptions = {
        from: 'AfroFashion Support Team <support@afrofashion.site>',
        to: email,
        subject: 'Password Reset Successful',
        text: `Hello,\n\nYour password has been reset successfully. If you did not request this change, please contact our support team immediately.\n\nBest regards,\n\nAfroFashion Support Team`,
    };
    try {
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password Reset email sent successfully' });
    }
    catch (error) {
        console.error('Error sending Password Reset email:', error.message);
        res.status(500).json({ error: 'Failed to send Password Reset email' });
    }
}));
exports.default = router;
