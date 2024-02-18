import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import './index.styles.scss';

const CategoryIndex = ({categories}) => {
  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <>
      <Container className='no-padding-container'>
        <div className='categories-container'>
          <div className='mx-auto m-2'>
            <h6>Explore Popular Categories</h6>
          </div>
          <div className='categories-slider'>
            { categories.map(
              ({ title, id, imageUrl, route }) => (
                <div key={id} className='category-column'> 
                  <div key={id} 
                    className='m-2 category-box'
                    onClick={() => onRouteHandler(route)}
                  >
                  <div 
                    className='img-box' 
                    style={{backgroundImage: `url(${imageUrl})`}}
                  />
                  <div className='mt-2 fs-smaller'>{title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  )
}

export default CategoryIndex