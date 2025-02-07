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
router.post("/send-email-verification-success-alert", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT), // Ensure port is a number
        secure: false, // true for port 465, false for others
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    const mailOptions = {
        from: 'no-reply@afrofashion.site',
        to: email,
        subject: 'Congratulations on verifying your Email! ✔',
        text: `Hi there!\n\nThank you for verifying your email.\n\nYour account is now active, and you can explore the full features of AfroFashion.\n\nHappy shopping! 👻\n\nAfroFashion AI`,
    };
    try {
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    }
    catch (error) {
        console.error('Error sending congratulatory email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}));
exports.default = router;
