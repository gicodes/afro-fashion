/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { Container } from "react-bootstrap";
import { Link} from "react-router-dom"

import './ads.styles.scss';

const AdSection = () => {
  return (
    <Container className="card bg-gray">
      <div className="ads-container">
        <div className="ad-header">
          <h6>Afro Fashion is africa's leading platform for buying & selling all kinds of fashion stuff, including trending outfits, local-made fits, thrifts, jewelries and accessories, etc. </h6>
        </div>
        <br/>
        <div className="ad-list">
          <div>
            <h6>Do you own a fashion store?</h6> 
            <ul>
              <li>Register as a <Link className="ad-link" to=''>Seller</Link> </li> 
              <li>Read the <Link className="ad-link" to=''>Terms</Link> of contract</li>
              <li>If you agree to it, sign the seller <Link className="ad-link" to={''}>contract</Link></li>
              <li>Proceed to <Link className="ad-link" to={''}>upload</Link> amazing products for your buyers!</li>
            </ul> 
          </div>
          <hr/>
          <div>
            <h6>Do you want to see the latest fashion products?</h6> 
            {/* <br/>  */}
            <ul>
              <li>Register as a <Link className="ad-link" to=''>Buyer</Link></li> 
              <li>Highlight your <Link className="ad-link" to=''>favorite</Link> items</li>
              <li>Subscribe to newsletters for email <Link className="ad-link" to={''}>notifications</Link></li>
              <li>Proceed to <Link className="ad-link" to={''}>Shop</Link> amazing tailored products for you!</li>
            </ul>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default AdSection;