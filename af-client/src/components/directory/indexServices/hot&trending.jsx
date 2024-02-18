import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { getTrendingItems } from '../../../utils/firebase.utils';

import './index.styles.scss';

const TrendingIndex = () => {
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
            Featured: Hot and Trending 🔥
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
                  style={{
                  backgroundImage: `url(${item.imageUrl})`
                  }}
                />
                <div className='name-price'>
                  <a 
                    href={`/shop/#${item.id}`}
                    className='mt-2 fs-smaller text-success'
                  >
                  {item.name}
                  </a>
                  <span 
                    className='v-center fs-smaller text-gray'
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