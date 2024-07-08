import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import './index.styles.scss';

const CategoryIndex = ({categories}) => {
  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <>
      <Container className='no-padding-container'>
        <div className='card categories-index-container'>
          <div className='card-header flex-just-center -mb2 p-3 pt-3'>
            <h6 className='title'>
              Explore Popular Categories &nbsp; 🛍️
            </h6>
          </div>
          <hr/>
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