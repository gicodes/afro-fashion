import Flutterwave from '../../utils/flutterwave';
import { useAlert } from '../../contexts/alert.context';
import { Card, Button, CloseButton } from 'react-bootstrap';

const PaymentCard = (
  { amount, email, name, phone_number, closePayCard, items }
  ) => {  
    const { addAutoCloseAlert } = useAlert();
  
    return (
    <>
      <Card className="mb-3 mx-3 bg-dark text-white">
        <Card.Body>
          <div className='pay-card-row'>
            <div className='flutter pay-card-col'>
              <img
                loading='lazy'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5vjsD24FVx-Mau-2c1opayAXvbIq6skHmubfv3222dQ&s"
                alt="Flutterwave Payment service"
                className="img-fluid i-1 pay-service-logo" 
              />
               
              <div className='i-2'>
                <h5 className="card-title">Powered by Flutterwave</h5>
                <p className="flex-just-center text-warning fs-smaller">Secure and convenient payments</p>
                <Flutterwave 
                  amount={amount} 
                  email={email} 
                  name={name}
                  items={items}
                  phone_number={phone_number} 
                />
              </div>
            </div>

            <div className='v-center flex-just-center'>
              <img
                loading='lazy'
                src="https://i.pngimg.me/thumb/f/720/comdlpng6953117.jpg"
                alt="Visa, MasterCard Payment service"
                className="img-fluid pay-services-icon" 
              />
            </div>
            
            <div className="paystack pay-card-col">
              <div className='i-2'>
                <h5 className="card-title">Powered by Paystack</h5>
                <p className="flex-just-center text-warning fs-smaller">Fast and reliable payments</p>
                <Button onClick={()=> addAutoCloseAlert("warning", 'Paystack payment is currently unavailable. Please try again later!')} className='fullWidth' variant="success">Pay with Paystack</Button>
              </div>

              <img
                loading='lazy'
                src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Paystack.png"
                alt="Flutterwave Payment service"
                className="img-fluid i-1 pay-service-logo" 
              />
            </div>
            <div 
              onClick={() => closePayCard()} 
              className='close-btn bg-gray'
            >
              <CloseButton /> 
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default PaymentCard;