import { Card } from '@mui/material';
import { Loading } from './fc-loading';
import { NoInternet } from './fc-noInt';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FeaturedCard } from './featured-card';
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { getTrendingItems } from '../../../utils/firebase.utils';

import '../index.styles.scss';

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
    <Card className='featured-container'>
      <div className='hot-and-trending'>
        <div className='fc-title'>
          <div className='bg fs-smaller fw-semibold'>
            <HiMiniArrowTrendingUp size={20} className='mt-1 mb-2' color='red' />
            <p> POPULAR</p>
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
      </Card>
  )
}

export default TrendingIndex