import './footer.styles.scss';
import { Card } from '@mui/material';

const Footer = () => {
  return (
    <Card 
      sx={{ bgcolor: "hsl(0, 0%, 80%)"}} 
      className='footer-container'
    >
      <br className='hide-in-lg' />
      <div className='footer-links'>
        <div className='links'>
          <p className='h-center'><a href="mailto:info@afrofashion.site">Send Us a Message</a></p>
          <p className='h-center'><a href='/#search'>Search Products</a></p>
          <p className='h-center'><a href='https://www.laughinghens.com/clothing-size-conversion-chart'>Size Variation</a></p>
        </div>
        <div className='links'>
          <p className='h-center'><a href='/help/#introduction'>About Afrofashion</a></p>
          <p className='h-center'><a href='/#help/#payments'>Exchange Rates</a></p>
          <p className='h-center'><a href='/subscriptions'>Subscriptions</a></p>
        </div> 
        <div className='links'>
          <p className='h-center'><a href='/privacy-policy'>Privacy Policy</a></p>
          {/* <p className='h-center'><a href='/privacy-policy'>Refund Policy</a></p> // disabled until pending further notice  */}
          <p className='h-center'><a href='/terms-of-service'>Terms Of Service</a></p>
        </div> 
      </div>
      
      <div className='h-center text-gray'>
        <hr className='w-50'/>
      </div>

      <div className='p-3 text-center'>
        <p className='font-awesome fs-smaller'>© Afrofashion, 2024</p>
      </div>
    </Card>
  )
}

export default Footer