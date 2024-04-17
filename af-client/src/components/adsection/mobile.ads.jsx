/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { FaChevronUp } from "react-icons/fa";
import Button from "../buttons/button.component";

import AdSection from "./ads";
import './ads.styles.scss';

const MobileAds = () => {
  const [ adsOpen, setAdsOpen ] = useState(false);

  function toggleAds() {
    if (adsOpen) {
      setAdsOpen(false);
    }
    else { setAdsOpen(true)}
  }

  return (
    <>
      <Navbar fixed="bottom" bg="dark" 
        style={{
          display: 'block',
          paddingTop: 0,
          marginBottom: -1,
          paddingBottom: 0,
          }}>

        {adsOpen && <AdSection/>}
        <div className="z-sm" onClick={toggleAds}> 
          <Button className="toggle button-frame v-center">
            <FaChevronUp size={15}/>
          </Button>
        </div>
      </Navbar>
    </>
  )
}

export default MobileAds;