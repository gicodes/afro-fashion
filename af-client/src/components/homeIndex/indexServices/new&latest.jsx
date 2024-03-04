import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Container } from 'react-bootstrap';
import { getLatestItems } from '../../../utils/firebase.utils';

import './index.styles.scss';

const LatestIndex = () => {
  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }
  const [latestItems, setLatestItems] = useState([]);

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const items = await getLatestItems();
        setLatestItems(items);
      } catch (error) {
        console.error('Error fetching Latest items:', error);
      }
    };

    fetchLatestItems();
  }, []);

  return (
    <>
      <Container className='no-padding-container featured-container'>
        <div className='new-and-latest'>
          <h6 className='flex-just-center m-2'>
            Featured: &nbsp;<span className='text-primary'> 
              New and Latest
            </span>&nbsp; 🆕
          </h6>
          <div className='items-row'>
          {latestItems.map((item, index) => (
            <Card 
              key={index} 
              className='card mt-1 mb-3'
              >
              <div key={index} className='item-box'>
                <div 
                  className='item-img'
                  onClick={() => onRouteHandler(`/marketplace#${item.id}`)}
                  style={{
                  backgroundImage: `url(${item.imageUrl})`
                  }}
                />
                <div className='name-price mt-2'>
                  <span className='fs-smaller text-success flex-wrap'>
                  {item.name}
                  </span>
                  <span 
                    className='v-center fs-smaller'
                  >
                    ${item.price}
                  </span>
                </div>
              </div>
            </Card>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default LatestIndex