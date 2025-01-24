import React from "react";
import { FaAmazonPay } from "react-icons/fa6";
import { FcLike, FcDislike } from "react-icons/fc";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { TbBrandInstagram, TbMailFilled } from "react-icons/tb";
import { formattedTime, formattedDate } from "../../components/date/dateConverter.ts";

import "./help.styles.scss";

export const HelpCard = () => {  
  const Template = ({ url, title, content }) => {
    return (
      <section key={url} id={url}>
        <h4 className="pb-3"> {title} </h4>
        <p> {content} </p> <br/>
      </section>
    )
  }

  const dash = <b className="fs-smaller text-gray">&#8212;</b>;
  const hiSpan = (text) => (<span className="text-success">{text}</span>);

  const recipient = "info@afrofashion.site";
  const subject = `Support Request Logged at ${formattedTime}, ${formattedDate}`;

  return (
    <div className="help-list-card">
      <Template
        url={"overview"}
        title={"Overview"}
        content={
          <span>
            <span>
              Afrofashion is an African-first online platform that connect buyers to sellers. 
              Both buyers and sellers are offered products or services that are in-demand and readily available.
              These include the sales of quality, affordable clothing items on the marketplace, business logistics
              {dash} and the promotion of local, fashion brands.
            </span>
            <span className="block mt-2"> 
              To ensure buyers get the best shopping experience, there is a convenient need to constantly improve 
              products and services. This is highlighted in our objective with local and foreign afro-couture brands{dash} {" "} 
              to make the final products authentic, simple and easy to sort{dash} with up to (15) different categories for products.
            </span>
            <span className="block mt-2">
              It is essential for vendors to elevate their online business and sales through {hiSpan("Afrofashion Business")}.
              The aim of the marketplace extends beyond expanding reach. It also offers tools for catalog management, 
              ticketing and online transactions{dash} while eliminating conventional risks such as bad or unrecorded sales, 
              invoices, and other inefficiencies associated with business protocols.
            </span>
          </span>
        }
      />

      <Template 
        url={"getting-started"}
        title={"Getting Started"}
        content={
          <span>
            Products and services are available to users on various access levels

            <span className="mt-2 mx-3">
              <li>
                <span className="fw-l-bold">Guest </span>
                profiles, despite being signed-out, have (limited) access to products on the Marketplace.
              </li>
              <li>
                <span className="fw-l-bold">Signed-in </span>
                profiles have full access to basic features i.e. instant shopping or saving items for later.
              </li>
              <li> 
                Signed-in, and <span className="fw-l-bold">{hiSpan ("Subscribed ")}</span> 
                profiles enjoy the complete user-experience with products and services. i.e. express shopping, 
                discount sales and raffle draws
              </li>

              <span className="block mt-2"> 
                Signing-in requires user email. 
                If a user email is not registered, there is a <a href="/auth/register" className="text-link">sign-up </a> option.
                <span className="block"> Registered users would require the associated email and password to sign in, and remain signed-in.</span> 
              </span>
            </span>

            <span id="/user/seller" className="block">
              Afrofashion Business is available to sellers on various service levels
              
              <span className="mt-2 mx-3">
                <li className="mt-1">
                  <span className="fw-l-bold">Signed-in</span>  {" "}
                  (pending verified) profiles have limited access to seller services such as creating multiple products.
                </li>
                <li>
                  <span className="fw-l-bold">Verified</span>  {" "}
                  profiles have full access to seller services such as creating products and completing inbound sales.
                </li>
                <li>
                  Signed-in, verified and <span className="fw-l-bold">{hiSpan("Subscribed")}</span> {" "} 
                  profiles qualify for exclusive business transactions and self-services.
                </li>

                <span className="block mt-2">Signing-in requires user email. There are (2) instances of signing in with email as a seller.
                  <span className="block mx-2">
                    * <i>Pre email-verification</i> {dash} Email and Password is required on sign-in.
                  </span>
                  <span className="block mx-2">
                    * <i>Post email-verification</i> {dash} Stay signed in with Magic Link, No Password required.
                  </span>
                </span>

                <span className="block mt-2">Signing up requires a valid email, new password and a unique {hiSpan ("Brand Name")}. </span>
                
                <li> Fill in and provide neccesary information to register a seller profile</li>
                <li> After clicking <b>submit</b> or <b>sign-up</b>, you will be required to accept Seller {hiSpan ("Terms & Conditions")}</li> 
                <li> Read and Complete the T&C's. You will be redirected to Dashboard and sent a {hiSpan ("Magic Link")}</li> 
                  <i className="p-3 fs-smaller text-gray">*At this stage, your profile has been created. The following steps will guide you through Email Verification</i>
                <li> In your email, there is a dynamic link from <i className="fs-smaller">noreply@afrofashion.site</i>. Save it and follow the link</li>
                <li> This link identifies user email automatically or will prompt you to enter the associated email</li>
                <li> You will see a <b>verification successful</b> message when this process is complete.</li>
                  <i className="p-3 fs-smaller text-gray">*Verifying your email will programmatically keep you signed-in.</i>
                <li> An account stays signed-in on the same device, unless browser cookies and data are cleared.</li>
                <li> If the account refuses to sign-in automatically, you can use the Magic Link again, until it expires.</li>
                <li>Sign-in links are directly sent only during sign-up, and can be programmatically regenerated upon link expiry.</li>
              
                <span className="block">
                  <i className="font-awesome fs-smaller p-3">
                    *This is an A-ok security feature- we are less than 36 weeks away from rolling in a new <b>2-FA method</b> for seller accounts*
                  </i>
                </span>
                You can request to turn off this feature, and sign in manually by contacting support.
              </span>
            </span>
          </span>
        }
      />

      <Template 
        url={"products"}
        title={"Products"}
        content={
          <span>
            Afrofashion products are designed to be both available, desireable and simple.{" "}
            Active products are generally listed in the <a href="/marketplace" className="link fw-l-bold">marketplace</a>.

            <span className="block mt-2"> 
              Variety and spanersity puts our fashion display into grouped classes and collections
              to show product range and enhance engagement.
            </span>
            <span className="block my-2">Here are five (5) classes of products</span>
            <span className="block mb-2">
              <span className="fw-l-bold">Categories</span>: The most distinctive class to identify or classify a product with is; category. 
              There are currently over up to (15) product categories, ranging from accessories, bags, shoes, men to women clothing, etc.
            </span>
            <span className="block mb-2">
              <span className="fw-l-bold">Seller Hub</span>: Branding is all about originality and genuinity. It's imperative that a product is linked to its source, 
              and this provides a class for sellers. When sellers have products in multiple categories, they are recognized as <span className="fw-l-bold">AF</span> Brands.
            </span>
            <span className="block mb-2">
              <span className="fw-l-bold">Location</span>: The best services are often the quickest. We try to ease commerce by closing the distance to a seamless service.
              Users can search for vendors or brands closeby, or in a particular location.
            </span>
            <span className="block mb-2">
              <span className="fw-l-bold">Featured</span> (Hot): Items with the most hits are collated and classed in our <span className="fw-l-bold">featured products</span>. 
              These products can be very random, irrespective of the category, seller or location.
            </span>
            <span className="fw-l-bold">Featured</span> 
            (New): New and recently updated items are collated and classed in our <span className="fw-l-bold">featured products</span>. 
              These products can be very random, irrespective of the category, seller or location.
          </span>
        }
      />

      <Template 
        url={"services"}
        title={"Services"}
        content={
          <span>
            Our services ensure a smooth and satisfying experience for users.
            Our commitment to excellence extends beyond what you buy, to wdash and how you buy it.
            
            <span className="block my-2"> Explore our range of services</span>
            
            <span className="block mb-2">
              <span className="fw-l-bold">Secure Solutions</span>: 
              Afrofashion system and services are built with client-server security in mind,
            by adopting various modernized tools and technology to ensure users enjoy secure services.</span>
            <span className="block mb-2">
              <span className="fw-l-bold">Self-services</span>: 
              Clients like to be in control, and fortunately the customer is always right.
              Afrofashion run a system that give users limited control over user-specific actions on the platform.</span>
            <span className="block mb-2">
              <span className="fw-l-bold">Management</span>: 
              In addition to self-services, Afrofashion also offer premium and express management solutions to both buyers and sellers.
              This is ideal to meet specific client demands and preferences.</span>
            <span className="block mb-2">
              <span className="fw-l-bold">Customer Support</span>: 
              There is a dedicated customer support channel to address any queries or concerns promptly and efficiently.
            </span>
            <span className="block mb-2">
              <span className="fw-l-bold">Marketing</span>: 
              There is an uncontested need for marketing in e-commerce. With business subscription, 
              users are given access to a vast network of vendors and industry contacts to facilitate sales and growth.</span>
          </span>
        }
      />

      <Template 
        url={"buying"}
        title={"Buying on Afrofashion"}
        content={
          <span> 
            <span className="block">
              Commerce is at the heart of Afro-fashion. Our operations and solutions offer interactive interfaces and a secure payment solution.
              Users can complete a purchase in less than 5 minutes with our simple and dynamic product cards.
            </span>
            
            <span id="user-management">
              <span className="block mt-3 fw-bold">User Management</span>

              <span className="block">At the footer (bottom area) on every product or item, there are action buttons that signed-in users can interact with.</span>
              <li> <FcLike /> <span className="mx-2 bg-ws">saves an item for later</span></li>
              <span className="mx-4 fs-smaller">Complete your purchase and track past orders from {hiSpan ("Dashboard ")}&gt; {hiSpan ('Past Orders')} </span>
              <li> <FaAmazonPay /> <span className="mx-2 bg-ws"> Takes you to checkout</span> </li>   
              <span className="mx-4 fs-smaller">View saved from {hiSpan ("Dashboard ")}&gt; {hiSpan ('Saved Items')} </span>     
              <li> <FcDislike /> <span className="mx-2 bg-ws"> hides items from your feed</span></li>
              <span className="mx-4 fs-smaller">Control what you see, Control what you buy *only on {hiSpan ('PREMIUM')}</span>

              <span className="block mt-2">Completing purchases give users points that can be used on discount sales or promo offers.
                <span className="block">There are other extended features for users with paid subscriptions such as self-services.</span>
              </span>
            </span>
          </span>
        }
      />
     
      <Template
        url={"selling"}
        title={"Selling on Afrofashion"}
        content={
          <span>
            Users with a locally registered Business can register and start selling on Afrofashion.
            <span className="block my-2"><a href="#getting-started/user/seller" className="link">Click to see more on seller registration and verification</a>.</span>

            <span id="brands-management">
              <span className="block mt-3 fw-bold">Brands Management</span>
              <span className="block">
                Brands management is a critical and integral aspect of our eco-system. 
                <span className="block mt-1 mb-1">Verified sellers can start a brand collection, and create or upload up to 5 products on the FREE tier.
                  We aim to achieve plenty, by working closely with vendors to enhance product visibility, authenticity, and consumer trust.
                </span>
              <span className="block mt-2 mb-1">Explore how brands can operate on a business level</span>
              <li> Authenticity: Stringent measures are in place to verify sellers and product authenticity-- this will boost confidence and trust</li>
              <li> Brand Promotion: Business promotions, targeted Ads, and other marketing strategies will be used to drive brand value and potential up</li>
              <li> Collaboration: Strategic partnerships can and will expand brand reach and resonate with more and yet diverse audience</li>
              <li> Loyalty Packages: Cash and prize incentives are up for grabs. We are happy to reward milestone sales and motivate brands and businesses</li>
              </span>
            </span>
          </span>
        }
      />
      
      <Template
        url={"payment"}
        title={"Payments on Afrofashion"}
        content={
          <span>
            <span className="block">
              Completing payments on e-commerce platforms don't come simpler than this. 
              Afrofashion offer users a good number of fast and seemless payment methods with
              <a className="link" href="https://flutterwave.com"> Flutterwave</a> and <a className="link" href="https://paystack.com">Paystack</a>.
              <span className="block mt-2 mb-2">
                Sellers are required to upload and verify their bank information on their profile (with 10+ supported banks), to instantly receive
                payments from buyers with our in-built payment solutions.
              </span>
              When users (buyers, sellers) transact through our payment portals, they are inveherently leveraging the fast and secure services.
              This also means that the vendors involved are subject to commission, and therefore the transactions will incur value-added-tax (VAT).
            </span>

            <span id="exchange-rates">
              <span className="block my-3 fs-mid text-secondary">
                <b>Exchange Rates</b>
              </span>
              <span className="block"> What's a good business without real and stable market rates? </span>
              <span className="block mt-2 mb-1">The default currency used to checkout payments on Afrofashion platforms is NGN, albeit products are listed and valued in USD. 
                We have taken initiative to balance the spread on the exchange rates with accurate data from live markets. 
                At the moment, our only supported currency-exchange pair is USD/NGN (US Dollar - Nigerian Naira).
              </span>
              In Collaboration with the best payment platforms, we can easily serve our users with up-to-date rates and seamless conversion between fiat amounts.
              Checking out, purchasing products or balancing point of sales can now be in local fiat (Naira).
              Some of the platforms responsible for these services include ForexAPI, Flutterwave, etc.
            </span>

            <span id="subscription">
              <span className="block my-3 fs-mid text-secondary">
                <b>Subscriptions</b>
              </span>
              <span>
                Afrofashion subscriptions offer exclusive benefits for buyers and sellers.
                <span className="block mt-1 mb-2"> 
                  To see our Subscriptions services, directly navigate to the far right button on the Navigation bar Top for <span><u className="text-success">mobile,</u></span> Bottom for <u className="text-success">larger devices</u> ), and follow the instructions on <a className="text-success" href="/#">Manage Subscription</a>.
                </span>
                <span className="block mt-2 mb-3"> Check out the Pros & Compare our subscriptions in detail </span>
                <li>Basic Package</li>
                <li>Business Package</li>
                <li>Premium Package</li> 
                <br/>
                <b>Please note:</b> clicking on <span className="text-luminous"><b>Subscribe Now</b></span> will initiate a payment window. 
                  You are advised not start this process if you are not ready to pay for your subscription.
              </span>
            </span>
          </span>
        }
      />

      <Template
        url={"shipping"}
        title={"Shipping with Afrofashion"}
        content={
          <span>
            At Afrofashion, we strive to ensure a seamless shopping experience that reflects the exclusivity and quality of our brand. 
            Our shipping process is tailored to meet the unique needs of our customers while maintaining transparency and efficiency. Here's what you need to know about our shipping policy:
            
            <span className="fw-l-bold my-2 block">Exclusive Shipping for Exclusive Deals</span>
            Shipping with Afrofashion is reserved for our exclusive deals or special orders. This means that only premium, high-value purchases qualify for delivery services. By focusing on these exclusive arrangements, we ensure that every item shipped is handled with care and attention to detail, maintaining the quality you expect from us.
            
            <span className="fw-l-bold my-2 block">Local Operations Only</span>
            Afrofashion operates within the city of Abuja (FCT), and our shipping services are limited to this region. This localized approach allows us to guarantee timely deliveries and maintain close relationships with our customers. If you're based in Abuja, you can enjoy the convenience of our exclusive shipping service for eligible orders.
            
            <span className="fw-l-bold my-2 block">Why use, and pay for AF shipping?</span>
            Our shipping policy reflects our commitment to providing a personalized and premium shopping experience. By focusing on exclusive deals and localized services, we prioritize quality, reliability, and customer satisfaction.
            Thank you for choosing Afrofashion, where every detail is tailored to meet your expectations. Whether you're placing an exclusive order or engaging in regular transactions, our policies are designed to ensure a smooth and enjoyable experience.
            For any questions or additional details, feel free to contact us. We’re here to help!
          </span>
        }
      />

      <Template
        url={"contact-us"}
        title={"Contact Channels"}
        content={
          <span>
            <span>
              <FaPhoneAlt /> &nbsp; +234 706 620 7973, +234 902 148 6959
            </span>
            <span className="block">
              <FaWhatsapp /> &nbsp; <a href="https://wa.me/2347066207973">+234 706 620 7973</a> 
            </span>
            <span className="block">
              <TbBrandInstagram /> &nbsp; <a href="https://instagram.com/afrofashion.ng" className="text-link"> afrofashion.ng </a>
            </span>
            <span>
              <TbMailFilled /> &nbsp; <a href={`mailto:${recipient}?subject=${encodeURIComponent(subject)}`} className="text-link"> info@afrofashion.site </a>
            </span>
          </span>
        }
      />
    </div>
  );
};
