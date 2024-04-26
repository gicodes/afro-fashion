import React from 'react';
import './footer.styles.scss';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <Container>
        <div className='footer container'>
          <div className='mt-5 flex-just-center'>
            <div className='w-25'>
                <hr className='h-center'/>
            </div>
          </div>
          <div className='footer-links'>
            <div className='links'>
                <p className='h-center'><a href="mailto:info@afrofashion.site">Send Us a Message</a></p>
                <p className='h-center'><a href='/#search'>Search Products</a></p>
                <p className='h-center'><a href='/'>Size Variation</a></p>
            </div>
            <div className='links'>
                <p className='h-center'><a href='/help/#introduction'>About Afrofashion</a></p>
                <p className='h-center'><a href='/#help/#payments'>Exchange Rates</a></p>
                <p className='h-center'><a href='/subscriptions'>Subscriptions</a></p>
                <p className='h-center'><a href='/privacy-policy'>Privacy Policy</a></p>
                <p className='h-center'><a href='/auth/accept-seller-terms'>Terms Of Service</a></p>
            </div> 

            <div className='h-center'>
                <hr className='w-25'/>
            </div>

            <div className='m-2 mb-5 font-awesome'>
                <h6>© Afrofashion, 2024</h6>
            
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Footer