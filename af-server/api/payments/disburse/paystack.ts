import express, { Request, Response, Router } from 'express';
import axios from "axios";

const router = express.Router();

interface SellerBankInfo {
  account_number: string;
  bank_code: string;
  seller_name: string;
}

interface PaystackTransferRequest {
  amount: number;
  sellerBankInfo: SellerBankInfo;
  tx_ref: string;
}

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack secret key is missing in environment variables");
}

router.post("/checkout/paystack-transfer", async (req: Request<{}, {}, PaystackTransferRequest>, res: Response) => {
  const { amount, sellerBankInfo, tx_ref } = req.body;
  const { account_number, bank_code, seller_name } = sellerBankInfo;

  if (!account_number || !bank_code || !seller_name) {
    return res.status(400).json({ error: "Seller bank information is incomplete" });
  }

  try {
    const recipientResponse = await axios.post(
      "https://api.paystack.co/transferrecipient",
      {
        type: "nuban",
        name: seller_name,
        account_number,
        bank_code,
        currency: "NGN",
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const recipient_code = recipientResponse.data.data.recipient_code; // Extract recipient code

    const transferResponse = await axios.post(
      "https://api.paystack.co/transfer",
      {
        source: "balance",
        amount: amount * 100, // Convert amount to kobo
        recipient: recipient_code,
        reason: "Seller payout",
        reference: tx_ref,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      message: "Transfer successful",
      data: transferResponse.data.data,
    });
  } catch (error: any) {
    console.error("Paystack Transfer API error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Payment processing failed",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
