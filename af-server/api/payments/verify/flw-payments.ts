import express, { Request, Response } from 'express';
import axios from "axios";

const router = express.Router();

interface VerifyFlwPaymentRequest {
  transaction_id: string;
}

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

if (!FLW_SECRET_KEY) {
  throw new Error("Flutterwave secret key is missing in environment variables");
}

router.post("/verify-flw-payment", async (req: Request<{}, {}, VerifyFlwPaymentRequest>, res: Response) => {
  const { transaction_id } = req.body;

  if (!transaction_id) {
    return res.status(400).json({ success: false, message: "Transaction ID is required" });
  }

  try {
    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    if (data.status === "success") {
      return res.json({ success: true, message: "Payment verified!", data });
    } else {
      return res.status(400).json({ success: false, message: "Transaction not found or invalid." });
    }
  } catch (error: any) {
    console.error("Flutterwave Verification Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Server error verifying payment",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
