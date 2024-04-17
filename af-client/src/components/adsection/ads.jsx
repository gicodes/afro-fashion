/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { Container } from "react-bootstrap";
import { Link} from "react-router-dom"

import './ads.styles.scss';

const AdSection = () => {
  return (
    <Container className="card bg-gray">
      <div className="ads-container">
        <div className="ad-header">
          <h6>Afro fashion is primed to be Africa's leading platform for buying & selling all kinds of fashion stuff. Including trending outfits, local-made fits, thrifts, jewelries, etc. </h6>
        </div>
        <br/>
        <div className="ad-list">
          <div>
            <h6>Like to see the latest fashion styles across the continent?</h6> 
            <ul>
              <li>Register as a <Link className="ad-link" to={'/auth/register'}>buyer</Link> to gain full access to <b>AF</b> marketplace</li> 
              <li>Login, surf the <Link className="ad-link" to={'/marketplace'}>marketplace</Link> or visit your favorite brand</li>
              <li>Save the products and items you like to your profile</li>
            </ul>
          </div>
          <div>
            <h6>Do you own a fashion business and want to make inbound sales?</h6> 
            <ul>
              <li>Register as a <Link className="ad-link" to={'/auth/register#seller'}>seller</Link> for access to <b>AF</b> marketplace</li> 
              <li>Read and agree to the terms of contract</li>
              <li>Once verified, create your brand name and proceed to <Link className="ad-link" to={'/profile#product-upload'}>upload</Link> amazing products!</li>
            </ul> 
          </div>
        </div>
      </div>

    </Container>
  )
}

export default AdSection;