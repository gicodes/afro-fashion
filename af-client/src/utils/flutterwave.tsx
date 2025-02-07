import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { getSellerBankInfo, getSellerId } from "./firebase.utils.ts";
import { addToSavedItems, reduceItemCount } from "./writeBatch.ts";
import { useAlert } from "../contexts/alert.context.tsx";
import React, { useState } from "react";

interface FlutterWaveProps {
  amount: number;
  email: string;
  name: string;
  items: any[];
  userId: string;
  phone_number: string;
}

const Flutterwave: React.FC<FlutterWaveProps> = ({
  amount,
  email,
  name,
  items,
  userId,
  phone_number,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addAutoCloseAlert } = useAlert();

  const tx_ref = `AF-${Date.now()}`;
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_KEY || "",
    tx_ref,
    amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number,
      name,
    },
    customizations: {
      title: "Complete your AF purchase",
      description: "Checkout payment with Flutterwave",
      logo: `${window.location.origin}/assets/afro-fashion.svg`,
    },
  };

  const verifyPayment = async (transaction_id: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/verify-flw-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transaction_id }),
      });

      const data = await response.json();
      return data.success;
    } catch (error: any) {
      addAutoCloseAlert("danger", `Error verifying payment: ${error.message}`);
      return false;
    }
  };

  const disbursePayment = async (transaction_id: string) => {
    setLoading(true);

    for (const item of items) {
      try {
        const sellerBankInfo = await getSellerBankInfo(item.seller?.toLowerCase());
        const sellerId = await getSellerId(item.seller?.toLowerCase());

        if (!sellerBankInfo || !sellerId) {
          throw new Error(`Seller info missing for ${item.seller}`);
        }

        const itemAmount = item.price * item.quantity; // 🔹 Pay seller only for their item

        const response = await fetch(`${SERVER_URL}/api/checkout/flutterwave`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item: item.name,
            amount: itemAmount,
            sellerBankInfo,
            tx_ref: transaction_id,
          }),
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

  const initializePayments = async (response: any) => {
    setLoading(true);

    if (response.status === "successful") {
      const isVerified = await verifyPayment(response.transaction_id);

      if (isVerified) {
        await disbursePayment(response.transaction_id);
        addAutoCloseAlert("success", "Payment successful!");
      } else {
        addAutoCloseAlert("danger", "Payment verification failed!");
      }
    }

    closePaymentModal();
    setLoading(false);
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <button
      type="button"
      disabled={loading}
      className="btn btn-success"
      onClick={() => {
        setLoading(true);
        handleFlutterPayment({
          callback: initializePayments,
          onClose: () => setLoading(false),
        });
      }}
    >
      {loading ? "Processing..." : "Pay with Flutterwave"}
    </button>
  );
};

export default Flutterwave;
