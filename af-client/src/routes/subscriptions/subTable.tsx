import React from 'react';
import { Table } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';
import { FaCheck, FaExclamation } from 'react-icons/fa';
import { subPricesPerMonthinNaira } from './subscription';

const Icon = ({ type, color, size }) => {
  const icons = {
    check: <FaCheck fill={color} />,
    cancel: <MdCancel fill={color} size={size} />,
    exclamation: <FaExclamation fill={color} />,
  };
  return icons[type] || null;
};

const Content = ({ text, className }) => (
  <span className={className}>{text}</span>
);

const SubscriptionTable = () => {
  const rows = [
    {
      perk: 'Instant Sales',
      description: 'Get paid instantly when buyers checkout',
      values: [
        <Icon type="check" color="green"  size={18}/>,
        <Icon type="check" color="green"  size={18}/>,
        <Icon type="check" color="green"  size={18}/>,
      ],
    },
    {
      perk: 'Items Range',
      description: 'Max number of items a seller can upload',
      values: [
        <Content text="25" className="text-gray" />,
        <Content text="50" className="text-gray" />,
        <Content text="99" className="text-gray" />,
      ],
    },
    {
      perk: 'Featured',
      description: 'Feature on AF platforms & media pages',
      values: [
        <Icon type="cancel" color="tomato" size={18} />,
        <Content text="2x weekly" className="text-gray fs-smaller" />,
        <Content text="1x daily" className="text-gray fs-smaller" />,
      ],
    },
    {
      perk: 'Ad-bound Sales',
      description: 'Reach new audience with AF targeted Ads',
      values: [
        <Icon type="cancel" color="tomato" size={18} />,
        <Icon type="cancel" color="tomato" size={18} />,
        <Icon type="check" color="green" size={18}/>,
      ],
    },
    {
      perk: 'Sales Reach',
      description: 'Audience reach and range for inbound sales',
      values: [
        <Content text="20 km" className="text-gray" />,
        <Content text="100 km" className="text-gray" />,
        <Content text="nationwide" className="text-gray fs-smaller" />,
      ],
    },
    {
      perk: 'Free Delivery',
      description: 'Claim free delivery fee on milestone sales',
      values: [
        <Icon type="cancel" color="tomato" size={18} />,
        <Content text="1" className="text-success" />,
        <Content text="3" className="text-success" />,
      ],
    },
    {
      perk: 'Price',
      description: 'Monthly',
      values: [
        <Content text={subPricesPerMonthinNaira[1]} className="text-gray" />,
        <Content text={subPricesPerMonthinNaira[2]} className="text-gray" />,
        <Content text={subPricesPerMonthinNaira[3]} className="text-gray" />,
      ],
    },
  ];

  return (
    <Table striped bordered hover responsive>
      <thead className="text-center">
        <tr>
          <th className="perks">Perks</th>
          <th>Basic</th>
          <th>Business</th>
          <th>Premium</th>
        </tr>
      </thead>
      <tbody className="align-middle text-center">
        {rows.map(({ perk, description, values }, index) => (
          <tr key={index}>
            <td className="perks">
              {perk}
              <span className="-a block">{description}</span>
            </td>
            {values.map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SubscriptionTable;
