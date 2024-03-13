import { Table } from 'react-bootstrap';
import { FaCheck, FaExclamation } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const SubscriptionTable = () => {
  const Yes = <span><FaCheck fill='green' /></span>
  const No = <span><MdCancel fill='tomato' size={18} /></span>
  const numContent = (num) => <span className='text-gray'>{num}</span>
  const textSuccess = (text) => <span className='text-success'><b>{text}</b></span>
  const textContent = (text) => <span className='text-gray fs-smaller'>{text}</span>

  return (
    <Table striped bordered hover responsive>
    <thead className='text-center'>
      <tr>
        <th className='-lg'></th>
        <th>Basic</th>
        <th>Business</th>
        <th>Premium</th>
      </tr>
    </thead>
    
    <tbody className="align-middle text-center">
    <tr>
      <td className='-lg'>
        Instant Sales
        <span className='-a block'>Complete sales and get money instantly</span>
      </td>
      <td>{Yes}</td>
      <td>{Yes}</td>
      <td>{Yes}</td>
    </tr>

    <tr>
      <td className='-lg'>
        Items Range
        <span className='-a block'>Max number of items a seller can upload</span>
      </td>
      <td>{numContent(25)}</td>
      <td>{numContent(50)}</td>
      <td>{numContent(99)}</td>
    </tr>

    <tr>
      <td className='-lg'>
        Featured
        <span className='-a block'>Get Featured on <b>AF</b> platforms & media pages</span>
      </td>
      <td>{No}</td>
      <td>{textContent('twice per week')}</td>
      <td>{textContent('once per day')}</td>
    </tr>
   
    <tr>
      <td className='-lg'>
        Ad-bound Sales
        <span className='-a block'>Reach new audience with <b>AF</b> targeted Ads</span>
      </td>
      <td>{No}</td>
      <td>{No}</td>
      <td>{Yes}</td>
    </tr>

    <tr>
      <td className='perks'>
        Sales Reach
        <span className='-a block'>Audience reach and distance for inbound sales</span>
      </td>
      <td>
        <span className='text-gray'>100</span>
        <i>{textContent('km')}</i>
      </td>
      <td>{textContent('nation-wide')}</td>
      <td>{textContent('world-wide')}</td>
    </tr>
    
    <tr>
      <td className='-lg'>
        Free Delivery <span className='r2p'> <FaExclamation/></span>
        <span className='-a block'>Claim free delivery fee on milestone sales</span> 
      </td>
      <td>{No}</td>
      <td>{textSuccess(1)}</td>
      <td>{textSuccess(3)}</td>
    </tr>

    <tr>
      <td className='-lg'>
        Price <span className='fs-smaller text-gray'>&nbsp; (Monthly)</span></td>
      <td>{numContent('$10')}</td>
      <td>{numContent('$25')}</td>
      <td>{numContent('$50')}</td>
    </tr>
  </tbody>
  </Table> 
  )
}

export default SubscriptionTable