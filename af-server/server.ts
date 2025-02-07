import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

dotenv.config();

import initializePaystack from './api/payments/checkout/paystack';
import disbursePayoutwPay from './api/payments/disburse/paystack';
import verifyFlwPayments from './api/payments/verify/flw-payments';
import disbursePayoutswFlw from './api/payments/disburse/flutterwave';
import sendCongratsEmail from './api/mailing/send-congratulatory-email';
import sendPasswordChangeAlert from './api/mailing/send-password-changed-alert';

const app: Express = express();

const allowedOrigins: string[] = ['http://localhost:3000', process.env.CLIENT_URL as string];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", sendCongratsEmail);
app.use("/api", sendPasswordChangeAlert);
app.use("/api", verifyFlwPayments);
app.use("/api", initializePaystack);
app.use("/api", disbursePayoutwPay);
app.use("/api", disbursePayoutswFlw);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
