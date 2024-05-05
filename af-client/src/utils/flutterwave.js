import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { getSellerBankInfo } from './firebase.utils';
import { reduceItemCount } from './writeBatch';

const SERVER_URL = 'http://localhost:5000';

export default function Flutterwave(
  { amount, 
    email, 
    name,
    items,
    phone_number }
  ) {
    const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_KEY,
    tx_ref: Date.now(),
    amount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email,
      phone_number,
      name,
    },
    customizations: {
      title: 'Afro fashion check-out and pay',
      description: 'Payment for items in cart with FlutterWave',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  // fwConfig comes as a template. 
  // However the following code has been tailored down to suit Afro-fashion's flutterwave flow
  const fwConfig = {
    ...config,
    redirectUrl: 'payments/success' || 'payments/failed',
    text: 'Pay with Flutterwave',
    callback: async (response) => {
      if (response.status === 'successful') {
        for (const item of items) {
          const sellerBankInfo = await getSellerBankInfo(item.seller.toLowerCase());

          const txRef = Date.now();

          const requestBody = {
            item: item.name,
            amount,
            sellerBankInfo,
            tx_ref: txRef,
          };

          try {
            const response = await fetch(`${SERVER_URL}/api/payments`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            });
            
            if (response.ok) {
              reduceItemCount(item);
            } else {
              console.error("Failed to dispatch payment:", response.statusText);
            }
          } catch (error) {
            console.error("Error handling payments:", error);
          }
        }
      }

      closePaymentModal()
    },
    onClose: () => { 
      // what went wrong?
    },
  };

  return (
    <div>
      <FlutterWaveButton className='btn btn-success fullWidth' {...fwConfig} />
    </div>
  );
}