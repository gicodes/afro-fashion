const Flutterwave = require('flutterwave-node-v3');
const express = require('express');

const app = express();

// Serve payment endpoint with flutterwave transfer operation
app.post('/api/payments', async (req, res) => {

  try {
    const { item, amount, sellerBankInfo, tx_ref } = req.body;
    const { account_bank, account_number } = sellerBankInfo;
    // const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

    const details = {
      account_bank: account_bank,
      account_number: account_number,
      amount: amount,
      currency: "NGN",
      narration: `Payment for ${item}`,
      reference: tx_ref,
    };

    // initiate transfer using Flutterwave SDK
    // const paymentResponse = await flw.Transfer.initiate(details);
    // console.log("Payment initiated:", paymentResponse);

    res.status(200).json({ message: "Payments dispatched successfully" });
  } catch (error) {
    console.error("Error dispatching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve client app for other routes 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-app/build', 'index.html'));
});