/* This is a Mobile first Component. Designed to render on Mobile Devices */

import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";

import AdSection from "../adsection/ads";
import './directory.styles.scss'

const Directory = ({categories}) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }
  const [ adsOpen, setAdsOpen ] = useState(false);

  function toggleAds() {
    if (adsOpen) {
      setAdsOpen(false);
    }
    else { setAdsOpen(true)}
  }

  return (
    <>
      <div className="adsOpen" onClick={toggleAds}>
        <span className="drop"><DropdownToggle size="sm"/></span>
      </div>
      {adsOpen && <AdSection/>}
      <br/>
      <Container className="card bg-gw">
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