import { Card } from "react-bootstrap";

export const FeaturedCard = ({item, index, onRouteHandler}) => (
    <Card 
      key={`card-${index}`} 
      className='mt-1 mb-3'
    >
      <div key={`item-${index}`} className='item-box'>
        <img 
          src={item?.imageUrl}
          alt={`${item?.name} box`}
          className='item-img'
          onClick={() => onRouteHandler(`/marketplace/products/${item.id}`)}
        />
        <div className='name-price mt-2 py-1'>
          <span className='name fs-smaller text-success flex-wrap'>
            {item.name}
          </span>
          <span 
            className='price v-center fs-smaller'
          >
            ${item.price}
          </span>
        </div>
      </div>
    </Card>
  )