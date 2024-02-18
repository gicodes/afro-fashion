import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Container } from 'react-bootstrap';
import { getTrendingItems } from '../../../utils/firebase.utils';

import './index.styles.scss';

const TrendingIndex = () => {
  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }
  const [trendingItems, setTrendingItems] = useState([]);

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const items = await getTrendingItems();
        setTrendingItems(items);
      } catch (error) {
        console.error('Error fetching trending items:', error);
      }
    };

    fetchTrendingItems();
  }, []);

  return (
    <>
      <Container className='no-padding-container'>
        <div className='hot-and-trending'>
          <h6 className='flex-just-center m-2'>
            Featured: &nbsp;<span className='text-success'> 
              Hot and Trending 🔥
            </span>
          </h6>
          <div className='items-row'>
          {trendingItems.map((item, index) => (
            <Card 
              key={index} 
              className='card mt-1 mb-3'
              >
              <div key={index} className='item-box'>
                <div 
                  className='item-img'
                  onClick={() => onRouteHandler(`/shop#${item.id}`)}
                  style={{
                  backgroundImage: `url(${item.imageUrl})`
                  }}
                />
                <div className='name-price'>
                  <span className='mt-2 fs-smaller text-success'>
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

export default TrendingIndex