import { Table } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const SubscriptionTable = () => {
  const Yes = <span className='flex-just-center'><FaCheck fill='green' /></span>
  const No = <span className='flex-just-center'><MdCancel fill='tomato' size={18} /></span>
  const numContent = (num) => <span className='flex-just-center text-gray'>{num}</span>
  const textSuccess = (text) => <span className='flex-just-center text-success'>{text}</span>
  const textContent = (text) => <span className='flex-just-center text-gray fs-smaller'>{text}</span>

  return (
    <Table striped bordered hover responsive>
    <thead className='text-center'>
      <tr>
        <th><span className='fs-smaller text-gray'>Monthly Perks</span></th>
        <th>Basic</th>
        <th>Business</th>
        <th>Premium</th>
      </tr>
    </thead>
    
    <tbody className="align-middle">
    <tr>
      <td>Cost <span className='fs-smaller text-gray'>(Monthly)</span></td>
      <td>{numContent('$10')}</td>
      <td>{numContent('$25')}</td>
      <td>{numContent('$50')}</td>
    </tr>

    <tr>
      <td>Regular Sales</td>
      <td>{Yes}</td>
      <td>{Yes}</td>
      <td>{Yes}</td>
    </tr>

    <tr>
      <td>Active products</td>
      <td>{numContent(25)}</td>
      <td>{numContent(50)}</td>
      <td>{numContent(99)}</td>
    </tr>

    <tr>
      <td>Featured</td>
      <td>{No}</td>
      <td>{textContent('twice per week')}</td>
      <td>{textContent('once per day')}</td>
    </tr>
   
    <tr>
      <td>Inbound Sales</td>
      <td>{No}</td>
      <td>{No}</td>
      <td>{Yes}</td>
    </tr>

    <tr>
      <td>Free Delivery</td>
      <td>{No}</td>
      <td>{textSuccess(2)}</td>
      <td>{textSuccess(5)}</td>
    </tr>

    <tr>
      <td>Sales Range</td>
      <td>{textContent('100km')}</td>
      <td>{textContent('nation-wide')}</td>
      <td>{textContent('world-wide')}</td>
    </tr>
    </tbody>
  </Table> 
  )
}

export default SubscriptionTable