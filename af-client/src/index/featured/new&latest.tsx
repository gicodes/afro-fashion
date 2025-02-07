import React from 'react';
import '../index.styles.scss';
import { Card } from '@mui/material';
import { Loading} from './fc-loading.tsx';
import { NoInternet } from './fc-noInt.tsx';
import { useEffect, useState } from 'react';
import { FeaturedCard } from './featured-card.tsx';
import { useNavigate } from "react-router-dom";
import { FeaturedItemsProps } from './hot&trending.tsx';
import { getLatestItems } from '../../utils/firebase.utils.ts';

const LatestIndex: React.FC = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [ latestItems, setLatestItems] = useState<FeaturedItemsProps[]>([]);
  const onRouteHandler = (route) => { navigate(route) }

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const items = await getLatestItems() as FeaturedItemsProps[];
        setLatestItems(items);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching Latest items:', error);
      }
    };

    fetchLatestItems();

    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width > 768) {
        setItemsToShow(6);
      } else {
        setItemsToShow(4);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);

    return () => {
      window.removeEventListener('resize', updateItemsToShow); // Cleanup listener
    };
  }, []);

  return (
    <Card className='featured-container'>
      <div className='new-and-latest'>
        <div className='fc-title'>
          <div className='bg fs-smaller fw-semibold'>
            <img className='icon-img' src='https://img.icons8.com/?size=96&id=z6am0h0aTiXX&format=png' alt='new category icon'/>
            <p>ARRIVALS</p>
          </div>
          
        </div>
        {isLoading && <Loading key="loading" />}
        {!isLoading && latestItems.length === 0 && <NoInternet key="noInternet" />}

        <div className='items-row'>
          {latestItems.slice(0, itemsToShow).map((item, index) => (
            <FeaturedCard 
              key={index}   
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

export default LatestIndex