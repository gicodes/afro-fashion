import React from 'react'
import { Container } from "react-bootstrap";

export const PrivacyPolicy = () => (
  // For some reason, this page in the app has been dedicated to "learnAboutAF" and as a way of protecting the application's policies, it will not be a single-standard-component
  <>
    <div className='card'>
      <div className='container p-2'>
        <div className='card-header text-center'>
          <h4>Privacy Policy</h4>
        </div>

        <div className='card-body fs-smaller text-center'>
          <div className='p-2'>
            <p>This Privacy Policy describes how Afrofashion (referred to as "we", "us", or "our") 
              collects, uses, and discloses your Personal Information when you visit or make a purchase from the Afrofashion platform.</p>
          </div>

          <br/>

          <div className='card m-1 p-5'>
            <h6>
              Information Collection and Use  &nbsp; <span className='fs-tiny'>[ 1.0 ]</span>
            </h6>
            <p>
              When you interact with Afrofashion, we collect certain information about your device, 
              your interaction with the platform, and information necessary to process your purchases. 
              We may also collect additional information if you contact us for customer support. In this Privacy Policy, 
              we refer to any information that can uniquely identify an individual (including the information below) as "Personal Information". 
              See the list below for more information about what Personal Information we collect and why.
            </p>

            <span>
              <b>Device information</b> &nbsp; [1.1]
            </span>
            <p>
              Examples of Personal Information collected include; version of web browser, IP address, time zone, cookie information, viewed products, search terms, and interactions with the platform.
              The purpose of this is to optimize the platform and perform analytics on usage.
              These information are collected automatically using cookies, log files, web beacons, tags, or pixels.
              Disclosure for smooth business transition can be shared with our processors Google and Flutterwave.
            </p>
            <span>
              <b>Order information</b>  &nbsp; [1.2]
            </span>
            <p>
              Examples of Personal Information collected include; name, billing address, shipping address, payment information, email address, and phone number.
              Purpose of this is to fulfill orders, process payments, arrange shipping, provide invoices and order confirmations, communicate with users, and provide relevant information or advertising.
              These informations are collected from verified users: sellers and buyers.
            </p>
            <span>
              <b>Customer support information</b>  &nbsp; [1.3]
            </span>
            <p>
              Examples of Personal Information collected include; information provided during customer support interactions.
              The purpose of this is to provide customer support.
              The source of collection is through and with the users consent.
              Disclosure for a business purpose: shared with our customer support vendors.
            </p>
          </div>

          <br/>

          <div className='card m-1 p-5'>
            <h6>
              Minors  &nbsp; <span className='fs-tiny'>[ 2.0 ]</span>
            </h6>
            <p>
              Afrofashion is not intended for individuals under the age of <b>12</b>. &nbsp; We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us to request deletion.
            </p>
          </div>

          <br/>
          
          <div className='card m-1 p-5'>
            <h6>
              Lawful Basis  &nbsp; <span className='fs-tiny'>[ 3.0 ]</span>
            </h6>
            <p>
              We process your personal information under various lawful bases, including consent, the performance of contracts, compliance with legal obligations, protection of vital interests, tasks carried out in the public interest, and our legitimate interests.
            </p>

            <span>
              <b>Automatic decision-making</b> &nbsp; [3.1]
            </span>
            <p>
              We do not engage in fully automated decision-making that has a legal or otherwise significant effect using customer data.
            </p>

            <span>
              <b>Retention</b> &nbsp; [3.2]
            </span>
            <p>
              We retain your Personal Information for our records unless and until you ask us to erase this information.
            </p>

            <span>
              <b>Your Rights</b> &nbsp; [3.3]
            </span>
            <p>
              If you are a resident of certain regions, including the European Economic Area (EEA) or California, you have certain rights regarding your Personal Information. Please contact us for more information.            
            </p>
          </div>

          <br/>

          <div className='card m-1 p-5'>
            <h6>
              Cookies  &nbsp; <span className='fs-tiny'>[ 4.0 ]</span>
            </h6>
            <p>
              We use cookies to optimize your experience on our platform. You can control and manage cookies in various ways, but please note that blocking cookies may impact your user experience.
            </p>

            <span>
              <b>Do Not Track</b> &nbsp; [4.1]
            </span>
            <p>
              We do not alter our data collection and usage practices in response to "Do Not Track" signals from your browser.
            </p>
          </div>

          <br/> 

          <div className='card m-1 p-5'>
            <h6>
              Changes &nbsp; <span className='fs-tiny'>[ 5.0 ]</span>
            </h6>
            <p>
            We may update this Privacy Policy from time to time. We encourage you to review this policy periodically for any changes.
            </p>
          </div>

          <div className='p-1 m-5'>
            <h4>Contact</h4>
            <p>
              For more information about our privacy practices or if you have questions, please contact us at <b>info@afrofashion.site</b>.
            </p>  If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority.
            

            <div className='mt-4 lg-div'>
              <b>Last updated:</b> <i>26/04/2024</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

const LearnAboutAF = () => {
  return (
    <>
      <Container className='no-padding-container'>
        <div className=''>
          
          <PrivacyPolicy/>
        </div>
      </Container>
    </>
  )
}

export default LearnAboutAF