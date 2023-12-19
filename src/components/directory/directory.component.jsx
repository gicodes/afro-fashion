/* This is a Desktop first Component. Designed to render on Desktop Devices */

import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
<<<<<<< HEAD
=======
import AdSection from "../adsection/ads";
>>>>>>> main__

const Directory = ({ categories }) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <Container className="categories-container">
<<<<<<< HEAD
<<<<<<< HEAD
=======
    <AdSection />
    <br/>
    <div className="categories-container bg-gw">
>>>>>>> main__
=======
    <AdSection />
    <br/>
    <div className="categories-container bg-gw">
>>>>>>> 8d5d34f (refacotoring 0.1)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    </div>
>>>>>>> main__
=======
    </div>
>>>>>>> 8d5d34f (refacotoring 0.1)
    </Container>
  )
}

export default Directory;