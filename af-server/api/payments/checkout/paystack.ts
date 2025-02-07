import express, { Request, Response, Router } from 'express';
import axios from 'axios';

const router: Router = express.Router();

interface PaystackRequest {
  amount: number;
  email: string;
  userId: string;
}

router.post("/checkout/paystack", async (req: Request<{}, {}, PaystackRequest>, res: Response) => {
    try {
      const { amount, email, userId } = req.body;

      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100,
          reference: `txn_${Date.now()}_${userId}`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return res.json(response.data.data);
    } catch (error: any) {
      console.error('Paystack API error:', error.response?.data || error.message);
      return res.status(500).json({ error: 'Failed to initialize transaction', details: error.response?.data });
    }
  }  
);

export default router;
