import { Card } from '@mui/material';
import { Loading} from './fc-loading';
import { NoInternet } from './fc-noInt';
import { useEffect, useState } from 'react';
import { FeaturedCard } from './featured-card';
import { useNavigate } from "react-router-dom";
import { getLatestItems } from '../../utils/firebase.utils';

import '../index.styles.scss';

const LatestIndex = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [ latestItems, setLatestItems] = useState([]);
  const onRouteHandler = (route) => { navigate(route) }

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const items = await getLatestItems();
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