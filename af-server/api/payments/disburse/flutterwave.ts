import express, { Request, Response } from 'express';
import axios from "axios";

const router = express.Router();

interface SellerBankInfo {
  account_bank: string;
  account_number: string;
  beneficiary_name: string;
}

interface FlutterwaveRequest {
  amount: number;
  sellerBankInfo: SellerBankInfo;
  tx_ref: string;
}

router.post("/checkout/flutterwave", async (req: Request<{}, {}, FlutterwaveRequest>, res: Response) => {
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
    const response = await axios.post(
      "https://api.flutterwave.com/v3/transfers",
      {
        account_bank,
        account_number,
        amount,
        currency: "NGN",
        reference: tx_ref,
        narration: "Seller payout",
        beneficiary_name,
        debit_currency: "NGN",
      },
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return res.json({ message: "Transfer successful", data: response.data.data });
    } else {
      return res.status(400).json({ error: "Transfer failed", details: response.data });
    }
  } catch (error: any) {
    console.error("Flutterwave API error:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Payment processing failed",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
