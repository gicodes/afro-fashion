import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { getLatestItems } from '../../../utils/firebase.utils';

import './index.styles.scss';
import { FeaturedCard } from './hot&trending';

export const Loading = () => (
  <span className='mt-2 mb-2'>
    Abeg chill, e dey load..
  </span>
)

export const NoInternet = () => (
  <span className='m-2'>
    No vex but the internet no gree
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
        <div className='new-and-latest'>
          <h6 className='flex-just-center m-2'>
            Featured: &nbsp;<span className='text-primary'> 
              New and Latest
            </span>&nbsp; 🆕
          </h6>
          <div className='items-row'>

            {isLoading && <Loading/>}

            {latestItems.map((item, index) => (
              <FeaturedCard 
                item={item} index={index} 
                onRouteHandler={onRouteHandler}
              />
              )) || <NoInternet/>
            }
          </div>
        </div>
      </Container>
    </>
  )
}

export default LatestIndex