import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { getLatestItems } from '../../../utils/firebase.utils';

import './index.styles.scss';
import { FeaturedCard } from './hot&trending';

export const Loading = () => (
  <span key="loading" className='mt-4 flex-just-center'>
    Abeg chill, make e load finish..
  </span>
)

export const NoInternet = () => (
  <span key="nointernet" className='mt-4 flex-just-center mb-4'>
    No vex boss, e be like network no too solid o..
  </span>
)

const LatestIndex = () => {
  const navigate = useNavigate();
  const [ isLoading, setLoading ] = useState(true);
  const [latestItems, setLatestItems] = useState([]);
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