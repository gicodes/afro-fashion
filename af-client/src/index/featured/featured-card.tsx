import { Card } from '@mui/material';
import React from 'react';

interface FeaturedCardProps {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    imageUrls: string | any;
  };
  index: number;
  onRouteHandler: (route: string) => void;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({item, index, onRouteHandler}) => {
  return (
    <Card 
      key={`card-${index}`} 
      className='mt-1 mb-3'
    >
      <div key={`item-${index}`} className='item-box'>
        <img 
          src={item?.imageUrls || item?.imageUrl}
          alt={`${item?.name}`}
          className='item-img'
          onClick={() => onRouteHandler(`/marketplace/products/${item.id}`)}
        />
        <div className='name-price mt-2 py-1'>
          <a className='name' href={`/marketplace/products/${item.id}`}>
            {item.name}
          </a>
          <span 
            className='price'
          >
            ₦{item.price}
          </span>
        </div>
      </div>
    </Card>
  )
}
