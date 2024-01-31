/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { Container } from "react-bootstrap";
import { Link} from "react-router-dom"

import './ads.styles.scss';

const AdSection = () => {
  return (
    <Container className="card bg-gray">
      <div className="ads-container">
        <div className="ad-header">
          <h6>Afro Fashion is africa's leading platform for buying & selling all kinds of fashion stuff, including trending outfits, local-made fits, thrifts, jewelries, etc. </h6>
        </div>
        <br/>
        <div className="ad-list">
          <div>
            <h6>Do you want to see the latest fashion products?</h6> 
            {/* <br/>  */}
            <ul>
              <li>Register as a buyer</li> 
              <li>Highlight your favorite items</li>
              <li>Subscribe to newsletters or email notifications</li>
              <li>Proceed to <Link className="ad-link" to={'/shop'}>Shop</Link> amazing tailored products for you!</li>
            </ul>
          </div>
          <hr/>
          <div>
            <h6>Do you own a fashion store?</h6> 
            <ul>
              <li>Register as a seller </li> 
              <li>Read the terms of contract</li>
              <li>If you agree to it, sign the seller contract </li>
              <li>Proceed to <Link className="ad-link" to={'/seller#upload'}>upload</Link> amazing products for your buyers!</li>
            </ul> 
          </div>
        </div>
      </div>

    </Container>
  )
}

export default AdSection;