/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import AdSection from "../adsection/ads";


// directory-holding-categories container seen on the homepage
const Directory = ({ categories }) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <Container className="categories-container">
      <AdSection />
      <div className="categories-container bg-gw">
        {
          categories.map(
            ({ title, id, imageUrl, route }) => (
              <div key={id} className="category-container"
                onClick={() => onRouteHandler(route)}
                >
                <div className='background-image'
                  style={{
                    backgroundImage: `url(${imageUrl})`
                  }} />
                <div className='category-body-container'>
                  <div className='title-container'>
                    <h2>{title}</h2>
                    <span>Shop now</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </Container>
  )
}

export default Directory;