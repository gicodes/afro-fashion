import React from 'react';
import { Card } from '@mui/material';
import { Loading } from './fc-loading.tsx';
import { NoInternet } from './fc-noInt.tsx';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FeaturedCard } from './featured-card.tsx';
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { getTrendingItems } from '../../utils/firebase.utils.ts';
import '../index.styles.scss';

export interface FeaturedItemsProps {
  id: string;
  title: string;
  description: string;
  // Add other properties as needed
};

const TrendingIndex: React.FC = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(true);
  const onRouteHandler = (route: string) => { navigate(route) }
  const [ trendingItems, setTrendingItems ] = useState<FeaturedItemsProps[]>([]);

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const items = await getTrendingItems() as FeaturedItemsProps[];
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