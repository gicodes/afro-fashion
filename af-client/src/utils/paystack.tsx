import { useAlert } from "../contexts/alert.context.tsx";
import PaystackPop from "@paystack/inline-js";
import { useState } from "react";
import { getSellerBankInfo, getSellerId } from "./firebase.utils.ts";
import { addToSavedItems, reduceItemCount } from "./writeBatch.ts";

export interface PaystackUserProps {
  amount: number;
  email: string;
  userId: string;
  items: any[];
}

export const Paystack: React.FC<PaystackUserProps> = ({ amount, email, userId, items }) => {
  const { addAutoCloseAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const tx_ref = `AF-${Date.now()}`;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const initializePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/api/checkout/paystack`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, email, userId }),
        credentials: "include",
      });

      const data = await response.json();
      if (!data.access_code) {
        throw new Error("Failed to fetch access code");
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.REACT_APP_PAYSTACK_KEY,
        email,
        amount: amount * 100, // Convert to kobo
        reference: data.reference,
        onSuccess: async (transaction: any) => {
          addAutoCloseAlert("success", `Payment successful: ${transaction.transaction}`);
          await disbursePayment();
        },
        onCancel: () => {
          addAutoCloseAlert("warning", "Payment canceled");
        },
      });
    } catch (error: any) {
      addAutoCloseAlert("danger", `Error initializing payment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const disbursePayment = async () => {
    setLoading(true);

    for (const item of items) {
      try {
        const sellerBankInfo = await getSellerBankInfo(item.seller?.toLowerCase());
        const sellerId = await getSellerId(item.seller?.toLowerCase());

        if (!sellerBankInfo || !sellerId) {
          throw new Error(`Seller info missing for ${item.seller}`);
        }
        const itemAmount = item.price * item.quantity;

        const response = await fetch(`${SERVER_URL}/api/checkout/paystack-transfer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: itemAmount, tx_ref, sellerBankInfo }),
          credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Transfer failed");
        }

        addToSavedItems(userId, item, "orders");
        reduceItemCount(item, sellerId);

        addAutoCloseAlert("success", `Payment to seller ${item.seller} successful!`);
      } catch (error: any) {
        addAutoCloseAlert("danger", `Seller payment failed: ${error.message}`);
      }
    }

    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={initializePayment}
      disabled={loading}
      className="btn btn-info"
    >
      {loading ? "Processing..." : "Pay with Paystack"}
    </button>
  );
};