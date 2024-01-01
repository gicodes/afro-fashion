import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { FaChevronUp } from "react-icons/fa";
import Button from "../buttons/button.component";

import AdSection from "../adSection/ads";
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
          paddingTop: 0
          }}>

        {adsOpen && <AdSection/>}
        <div className="z-sm" onClick={toggleAds}> 
          <Button className="toggle button-container">
            <FaChevronUp size={20}/>
          </Button>
        </div>
      </Navbar>
    </>
  )
}

export default MobileAds;