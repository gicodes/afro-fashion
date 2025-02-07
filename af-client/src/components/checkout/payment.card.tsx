import Flutterwave from '../../utils/flutterwave.tsx';
import { Card, CloseButton } from 'react-bootstrap';
import { Paystack } from 'src/utils/paystack.tsx';

const PaymentCard = ({ 
  amount, 
  email, 
  name, 
  items,
  phone_number,
  userId,
  closePayCard,
 }) => {
  return (
    <Card 
      style={{
        backgroundImage: 'url(https://i0.wp.com/blog.lenco.ng/wp-content/uploads/2022/11/Most-commonly-used-debit-cards-in-Nigeria.png?resize=1200%2C675&ssl=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="bg-dark text-white col-md-8 mx-auto mb-2">
      <Card.Body>
        <div className='pay-card-row'>
          <div className='pay-card-col'>
            <Flutterwave 
              amount={amount} 
              email={email} 
              name={name}
              items={items}
              phone_number={phone_number}
              userId={userId}
            />
          </div>
          <div className="pay-card-col">
            <Paystack 
              amount={amount} 
              email={email} 
              userId={userId}
              items={items}
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
  )
}

export default PaymentCard;