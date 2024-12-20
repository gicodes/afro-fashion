import { FaAmazonPay } from "react-icons/fa6";
import "./help.styles.scss";
import { FcLike, FcDislike } from "react-icons/fc";

export const HelpCard = () => {
  const hy = <b className="fs-smaller text-gray">&#8212;</b>;
  const hiSpan = (text) => (<span className="text-success">{text}</span>);

  return (
    <section className="help-list-card">
      <div>
        <section id="overview">
          <h4 className="pb-3">
            Overview
          </h4>

          <p>
            <span>
              Afrofashion is an African-first online platform that connect buyers to sellers. 
              Both buyers and sellers are offered products or services that are in-demand and readily available.
              These include the sales of quality, affordable clothing items on the marketplace, business logistics
              {hy} and the promotion of local, fashion brands.
            </span>
            <span className="block mt-2"> 
              To ensure buyers get the best shopping experience, there is a convenient need to constantly improve 
              products and services. This is highlighted in our objective with local and foreign afro-couture brands{hy} {" "} 
              to make the final products authentic, simple and easy to sort{hy} with up to (15) different categories for products.
            </span>
            <span className="block mt-2">
              It is essential for vendors to elevate their online business and sales through {hiSpan("Afrofashion Business")}.
              The aim of the marketplace extends beyond expanding reach. It also offers tools for catalog management, 
              ticketing and online transactions{hy} while eliminating conventional risks such as bad or unrecorded sales, 
              invoices, and other inefficiencies associated with business protocols.
            </span>
          </p>
        </section>
      </div>
      <br/>

      <div> 
        <section id="getting-started">
          <h4>Getting Started</h4>

          <section id="getting-started/user/buyer">
            <h5 className="mx-1 my-3 text-gray fw-semibold">{hy} Buyer Profile </h5>

            <div className="mx-3">
              Products and services are available to users on various access levels..
              <li>
                <span className="fw-l-bold">guest </span>
                profiles, despite being signed-out, have (limited) access to products on the Marketplace.
              </li>
              <li>
                <span className="fw-l-bold">signed-in </span>
                profiles have full access to basic features i.e. instant shopping or saving items for later.
              </li>
              <li> 
                signed-in, and <span className="fw-l-bold">{hiSpan ("subscribed ")}</span> 
                profiles enjoy the complete user-experience with products and services i.e. Express shopping, 
                Top picks or Discount sales and Raffle draws
              </li>
              <p> 
                Signing-in requires user email. 
                If a user email is not registered, there is a <a href="/auth/register" className="link">sign-up </a> option.
                <span className="block"> Registered users would require the associated email and password to sign in, and remain signed-in.</span> 
              </p>
            </div>
          </section>

          <section id="getting-started/user/seller">
            <h5 className="mx-1 my-3 text-gray fw-semibold">{hy} Seller Profile</h5>

            <div className="mx-3">
              Afrofashion Business is available to sellers on various service levels..
              <li className="mt-1">
                <span className="fw-l-bold">signed-in</span>  {" "}
                (un-verified) profiles have limited access to seller services such as creating multiple products.
              </li>
              <li>
                <span className="fw-l-bold">verified</span>  {" "}
                profiles have full access to seller services such as creating products and completing inbound sales.
              </li>
              <li>
                signed-in, verified and <span className="fw-l-bold">{hiSpan("subscribed")}</span> {" "} 
                profiles qualify for exclusive business transactions and self-services.
              </li>

              <p>Signing-in requires user email. </p>
              There are (2) instances of signing in with email as a seller.
              <span className="block">
                *<i>before email verification</i> {hy} Email and Password is required on sign-in.
              </span>
              <span className="block">
                *<i>after email verification</i> {hy} Stay signed in with Magic Link, No Password required. 
                Powered by <span className="text-link"> Google</span>.
              </span>

              <p className="mt-3">Signing up requires a valid email, new password and a unique {hiSpan ("Brand Name")}. </p>
              
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
            
              <div></div><i className="font-awesome fs-smaller p-3">*This is an A-ok security feature- we are less than 36 weeks away from rolling in a new <b>2-FA method</b> for seller accounts*</i>
              <p>You can request to turn off this feature, and sign in manually by contacting support.</p>
            </div>
          </section>

          <section id="products">
            <h6 className="mx-1 my-3">{hy} Products</h6>

            <p className="mx-2">
              Afrofashion products are designed to be both available, desireable and simple.{" "}
              Active products are generally listed in the <a href="/marketplace" className="link fw-l-bold">marketplace</a>.
              <span className="block mt-2"> 
                Variety and diversity puts our fashion display into grouped classes and collections
                to show product range and enhance engagement.
              </span>
              <span className="block my-2">Here are five (5) classes of products</span>
              <span className="block mb-2">
                <span className="fw-l-bold">Categories</span>: The most distinctive class to identify or classify a product with is; category. 
                There are currently over up to (15) product categories, ranging from accessories, bags, shoes, men to women clothing, etc.
              </span>
              <span className="block mb-2">
                <span className="fw-l-bold">SAA Brand</span>: Branding is all about originality and genuinity. It's imperative that a product is linked to its source, 
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
              <span className="fw-l-bold">Featured</span> (New): New and recently updated items are collated and classed in our <span className="fw-l-bold">featured products</span>. 
                These products can be very random, irrespective of the category, seller or location.
            </p>
          </section>

          <section id="services">
            <h6 className="mx-1 my-2">{hy} Services</h6>

            <p className="mx-2">
              Our services ensure a smooth and satisfying experience for users.
              Our commitment to excellence extends beyond what you buy, to why and how you buy it.
              
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
            </p>
          </section>

        </section>
      </div>
      <br/>
      
      <div>
        <section id="buying">
          <h4>Buying on Afrofashion</h4>
          <p> Commerce is at the heart of Afro-fashion. Our operations and solutions offer interactive interfaces and a secure payment solution.
            Users can complete a purchase in less than 5 minutes with our simple and dynamic product cards.
          </p>
          
          <section id="user-management">
            <h6 className="text-secondary">User Management</h6>

            <span className="block">At the footer (bottom area) on every product or item, there are action buttons that signed-in users can interact with.</span>
            <li> <FcLike /> <span className="mx-2 bg-ws">saves an item for later</span></li>
            <span className="mx-4 fs-smaller">Complete your purchase and track past orders from {hiSpan ("Dashboard ")}&gt; {hiSpan ('Past Orders')} </span>
            <li> <FaAmazonPay /> <span className="mx-2 bg-ws"> Takes you to checkout</span> </li>   
            <span className="mx-4 fs-smaller">View saved from {hiSpan ("Dashboard ")}&gt; {hiSpan ('Saved Items')} </span>     
            <li> <FcDislike /> <span className="mx-2 bg-ws"> hides items from your feed</span></li>
            <span className="mx-4 fs-smaller">Control what you see, Control what you buy *only on {hiSpan ('PREMIUM')}</span>

            <p className="mt-2">Completing purchases give users points that can be used on discount sales or promo offers.
              <span className="block">There are other extended features for users with paid subscriptions such as self-services.</span>
            </p>
          </section>
        </section>
      </div>
      <br/>
     
      <div>
        <section id="selling">
          <h4>Selling on Afrofashion</h4> 
          Users with a locally registered Business can register and start selling on Afrofashion.
          <span className="block my-2"><a href="#getting-started/user/seller" className="link">Click to see more on seller registration and verification</a>.</span>

          <section id="brands-management">
            <h6 className="mt-3 text-secondary">Brands Management</h6>
            <p>
              Brands management is a critical and integral aspect of our eco-system. 
              <span className="block mt-1 mb-1">Verified sellers can start a brand collection, and create or upload up to 5 products on the FREE tier.
                We aim to achieve plenty, by working closely with vendors to enhance product visibility, authenticity, and consumer trust.
              </span>
            <span className="block mt-2 mb-1">Explore how brands can operate on a business level</span>
            <li> Authenticity: Stringent measures are in place to verify sellers and product authenticity-- this will boost confidence and trust</li>
            <li> Brand Promotion: Business promotions, targeted Ads, and other marketing strategies will be used to drive brand value and potential up</li>
            <li> Collaboration: Strategic partnerships can and will expand brand reach and resonate with more and yet diverse audience</li>
            <li> Loyalty Packages: Cash and prize incentives are up for grabs. We are happy to reward milestone sales and motivate brands and businesses</li>
            </p>
          </section>
        </section>
      </div> <br/>

      <div id="payments">
        <h4>Payments on Afro Fashion</h4>
        <p>
          Completing payments on e-commerce platforms don't come simpler than this. 
          Afrofashion offer users a good number of fast and seemless payment methods with
          <a className="link" href="https://flutterwave.com"> Flutterwave</a> and <a className="link" href="https://paystack.com">Paystack</a>.
          <span className="block mt-2 mb-2">
            Sellers are required to upload and verify their bank information on their profile (with 10+ supported banks), to instantly receive
            payments from buyers with our in-built payment solutions.
          </span>
          When users (buyers, sellers) transact through our payment portals, they are inveherently leveraging the fast and secure services.
          This also means that the vendors involved are subject to commission, and therefore the transactions will incur value-added-tax (VAT).
        </p>

        <section id="exchange-rates">
          <h6 className="pt-4 text-secondary"><b>Exchange Rates</b></h6>
          <p>
            What's a good business without real and stable market rates? 
          </p>
          <span className="block mt-2 mb-1">The default currency used to checkout payments on Afrofashion platforms is NGN, albeit products are listed and valued in USD. 
            We have taken initiative to balance the spread on the exchange rates with accurate data from live markets. 
            At the moment, our only supported currency-exchange pair is USD/NGN (US Dollar - Nigerian Naira).
          </span>
          In Collaboration with the best payment platforms, we can easily serve our users with up-to-date rates and seamless conversion between fiat amounts.
          Checking out, purchasing products or balancing point of sales can now be in local fiat (Naira).
          Some of the platforms responsible for these services include ForexAPI, Flutterwave, etc.
        </section>

        <section id="subscription">
          <h6 className="pt-4 text-secondary"><b>Subscription</b></h6>
          <p>
            Afrofashion subscriptions offer exclusive benefits for buyers and sellers.
            <span className="block mt-1 mb-2"> 
              To see our Subscriptions services, directly navigate to the far right button on the Navigation bar Top for <span><u className="text-success">mobile,</u></span> Bottom for <u className="text-success">larger devices</u> ), and follow the instructions on <a className="text-success" href="/#">Manage Subscription</a>.
            </span>
            <span className="block mt-2 mb-3"> Check out the Pros & Compare our subscriptions in detail </span>
            <li>Basic Package</li>
            <li>Business Package</li>
            <li>Premium Package</li> 
            <br/><b>Please note:</b> clicking on <span className="text-gray"><b>Subscribe Now</b></span> will initiate a payment window. 
              You are advised not start this process if you are not ready to pay for your subscription.
          </p>
        </section>
      </div> <br/>

      <div id="shipping">
        <h4>Shipping with Afro Fashion</h4>
        <p>
          To start shipping with AfroFashion, 
          you will need a reliable courier service that is regulated and operational within the buyer-and-seller region.
          <span className="block mt-2 mb-2">Buyers and sellers use close-proximity services to enhance sales experience, 
            and ultimately bridge the gap between purchase and delivery of said products.
          </span>
          <span className="block mt-2 mb-2">Delivery for regular sales are handled between buyer and seller, 
            with Afro Fashion acting as the escrow for these transactions. However, milestone sales e.g.
            Sellers who complete 25 sales in one day, and Buyers with $1000+ spent at-a-go, etc.
            will earn free delivery with Afrofashion's Business Subscription. Premium version gets 3 free deliveries per month.
          </span>
          <b>Please Note</b>: Afrofashion will NOT be responsible for the cost and safety of items shipped without our delivery service.
        </p>
      </div>
    </section>
  );
};
