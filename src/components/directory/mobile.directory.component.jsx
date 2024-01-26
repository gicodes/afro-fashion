/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import './directory.styles.scss'
import AdSection from "../adsection/mobile.ads";
import { SearchBar } from "../searchServices/search-bar";

// This component is rendered on the landing page
const Directory = ({categories}) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <>
      <Container className="no-padding-container mb-5">
        <SearchBar resultSx={"-mt pt-2"}/>
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
      <br/>
    </>
  )
}

export default Directory;