/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import './directory.styles.scss'
import AdSection from "../adSection/mobile.ads";


// directory-holding-categories container seen on the homepage
const Directory = ({categories}) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <>
      <Container className="no-padding-container y-m">
        <AdSection />
        {
          categories.map(
          ({ title, id, imageUrl, route }) => (
            <div key={id} className="directory card bg-gw">
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
                </div>
              </div>
            </div>
            </div>
          ))
        }
      </Container>
      <hr/>
    </>
  )
}

export default Directory;