import { Loading } from './fc-loading';
import { NoInternet } from './fc-noInt';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FeaturedCard } from './featured-card';
import { getTrendingItems } from '../../../utils/firebase.utils';

import '../index.styles.scss';
import { Card } from '@mui/material';

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
        <div className='flex-just-center'>
          <img className='icon-img' src='https://img.icons8.com/?size=96&id=4g9D6i4Tppwe&format=png' alt='hot category icon'/>
          <span className='fs-smaller v-center'> 
            Most popular items are featured in this category
          </span>
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