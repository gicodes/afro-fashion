/* This is a Mobile first Component. Designed to render on Mobile Devices */

import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import AdSection from "../../AdSection";

const Directory = ({categories}) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <Container className="card container">
      <AdSection />
      <br/>
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
                <div className='title-container container'>
                  <h2>{title}</h2>
                  <h4>Shop now</h4>
                </div>
              </div>
            </div>
          ))
      }
    </Container>
  )
}

export default Directory;