/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import AdSection from "../adsection/ads";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../searchServices/search-bar";

// This component is rendered on the `landing` page
const Directory = ({ categories }) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <>
      <Container className="categories-container">
        <AdSection />
        <SearchBar searchSx={"-mb2 mt-1"} resultSx={"lg-fullWidth"} />
        <div className="categories-container bg-gw y-m mb-5">
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
                </div>
              </div>
            </div>
            ))
          }
        </div>
      </Container>
      <div className="mt-5"></div>
    </>
  )
}

export default Directory;