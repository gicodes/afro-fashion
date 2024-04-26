import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Container } from 'react-bootstrap';
import { Loading, NoInternet } from './new&latest';
import { getTrendingItems } from '../../../utils/firebase.utils';

import './index.styles.scss';

export const FeaturedCard = ({item, index, onRouteHandler}) => (
  <Card 
    key={`card-${index}`} 
    className='card mt-1 mb-3'
  >
    <div key={`item-box-${index}`} className='item-box'>
      <div 
        className='item-img'
        onClick={() => onRouteHandler(`/marketplace/products/${item.id}`)}
        style={{
          backgroundImage: `url(${item.imageUrl})`
        }}
      />
      <div className='name-price mt-2'>
        <span className='name fs-smaller text-success flex-wrap'>
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
)

const TrendingIndex = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(true);
  const onRouteHandler = (route) => { navigate(route) }
  const [trendingItems, setTrendingItems] = useState([]);

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const items = await getTrendingItems();
        setTrendingItems(items);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching trending items:', error);
      }
    };

    fetchTrendingItems();
  }, []);

  return (
    <>
      <Container className='no-padding-container featured-container'>
        <div className='card hot-and-trending'>
          <div className='card-header'>
            <span className='lead-title text-primary'>FEATURED</span>
            <div className='flex-just-center'>
              <img className='icon-img' src='https://img.icons8.com/?size=96&id=4g9D6i4Tppwe&format=png' alt='hot category icon'/>
              <span className='lead-caption'> 
                Most popular items are featured randomly in this category
              </span>
            </div>
          </div>
          
          {isLoading && <Loading key="loading" />}
          {!isLoading && trendingItems.length === 0 && <NoInternet key="noInternet" />}

          <div className='items-row'>
            {trendingItems.map((item, index) => (
              <FeaturedCard 
                key={`featured-card-${index}`} 
                item={item} 
                index={index} 
                onRouteHandler={onRouteHandler}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default TrendingIndex