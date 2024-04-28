import React from 'react';
import './footer.styles.scss';

const Footer = () => {
  return (
    <>
        <div className='-footer container'>
          <div className='flex-just-center mb-5'>
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
            </div> 
            <div className='links'>
                <p className='h-center'><a href='/privacy-policy'>Privacy Policy</a></p>
                <p className='h-center'><a href='/privacy-policy'>Refund Policy</a></p>
                <p className='h-center'><a href='/'>Terms Of Service</a></p>
            </div> 

            <div className='h-center'>
                <hr className='w-25'/>
            </div>
          </div>

          <div className='mt-5 mb-3 font-awesome copyright'>
            <h6>© Afrofashion, 2024</h6>
          </div>
        </div>
    </>
  )
}

export default Footer