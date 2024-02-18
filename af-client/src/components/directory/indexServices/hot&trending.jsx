import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getTrendingItems } from '../../../utils/firebase.utils';

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
          <h6>Featured: Hot and Trending 🔥</h6>
          {trendingItems.map((item, index) => (
            <div 
              key={index} 
              className='card container'
              >
              <div key={index} className='item-box'>
                <div 
                  className='item-img'
                  style={{
                  backgroundImage: `url(${item.imageUrl})`
                  }}
                />
                <a 
                  href={`/shop/#${item.link}`}
                  className='mt-2 fs-smaller'
                >
                  {item.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default TrendingIndex