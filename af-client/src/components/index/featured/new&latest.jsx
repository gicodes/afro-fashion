import { Loading} from './fc-loading';
import { NoInternet } from './fc-noInt';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FeaturedCard } from './featured-card';
import { useNavigate } from "react-router-dom";
import { getLatestItems } from '../../../utils/firebase.utils';

import '../index.styles.scss';

const LatestIndex = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(true);
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
  }, []);

  return (
    <>
      <Container className='no-padding-container featured-container'>
        <div className='card new-and-latest'>
          <div className='card-header'>
            <span className='lead-title text-primary'>FEATURED</span>
            <div className='flex-just-center'>
              <img className='icon-img' src='https://img.icons8.com/?size=96&id=z6am0h0aTiXX&format=png' alt='new category icon'/>
              <span className='lead-caption'> 
                New and most recent items are featured in this category
              </span>
            </div>
          </div>

          {isLoading && <Loading key="loading" />}
          {!isLoading && latestItems.length === 0 && <NoInternet key="noInternet" />}

          <div className='items-row'>
            {latestItems.map((item, index) => (
              <FeaturedCard 
                key={index}   
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

export default LatestIndex