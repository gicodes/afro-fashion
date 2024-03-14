import "./help.styles.scss";

export const HelpCard = () => {
  return (
    <section className="help-list-card">
      <div id="introduction">
        <h4 className="pb-3">Introduction</h4>
        <p>
          Afrofashion is an African-first online platform that connect buyers to sellers, 
          offer complete e-commerce services and help small-scale african brands grow and manage their businesses. 
          <span className="block mt-1 mb-1">Fashion-instas can take e-shopping to the next level with services from over 25 brands, 
            1000+ unique products and up to 15 item categories to choose from.
          </span>
          New and experienced vendors can both benefit from Afro Fashion branding and marketing thier products.
          Considering cross-functionality of our web, mobile and social media platforms,
          vendors are bound to make 5x the normal sales without worrying about customer base.
        </p>
      </div>
      <br/>

      <div id="getting-started">
        <h4>Getting Started</h4>

        <section id="products">
          <h6 className="pt-4 text-secondary"><b>Products</b></h6>
          <p>
            If our business offers are the hook to convert a client (buyer or seller), then surely our products are the catch, right?
            <span className="block mb-2">Fashion products are self-promoting, 
              but it’s our job to set the hook right so that a customer is happy with the catch.
            </span>
            <span className="block mb-2">You can find all active products in our <a href="/marketplace" className="link">marketplace</a>. 
              However, products can vary widely, considering how diverse people's fashion senses can be. 
              This is why we have grouped collections to enhance user engagement and maintain clarity in variety.
              <span className="block mt-2">Here are five (5) <b>classes</b> of products;</span>
            </span>
            <span className="block mb-2"><b>Categories</b>: The most distinctive class to identify or classify a product with is category. 
              There are currently over 15 product categories, ranging from accessories, bags, shoes, men to women clothing, etc.
            </span>
             <span className="block mb-2"><b>Brands</b>: At Afrofashion, we care about commerce and originality. Since, every product has a vendor (seller), 
              it's only natural for products to be classed by the seller. Sellers with multiple product categories can be known as <b>AF</b> brands.
            </span>
            <span className="block mb-2"><b>Location</b>: The best services are often the simplest. We try to ease e-commerce by shortening the distance to a seamless service.
              Users can search for vendors or brands registered within a particular location.
            </span>
            <span className="block mb-2"><b>Featured (Hot)</b>: Items with the most hits are collated and classed in our featured products. 
              These products can be very random and irrespective of the category, seller or location.
            </span>
            <b>Featured (New)</b>: New and recently updated items are collated and classed in our featured products. 
              These products can be very random and irrespective of the category, seller or location.
          </p>
        </section>

        <section id="services">
    <h6 className="pt-4 text-secondary"><b>Services</b></h6>
    <p>
        Get ahead of the line by getting started with our services that ensure a smooth and satisfying experience for the clients.
        Our commitment to excellence extends beyond what you buy, to why and how you buy it.
        <span className="block mt-2 mb-2">Explore our range of services for a buyer, seller or third-party</span>
        <span className="block mb-2"><b>Secure Solutions</b>: Afrofashion system and services are built with client and server security in mind. 
        We have adopted various modernized tools and technology to ensure our users enjoy secure solutions.</span>
        <span className="block mb-2"><b>Self-services</b>: Clients like to be in control, and fortunately the customer is always right.
        Afrofashion run a system that give users limited control over user-specific actions on the platform.</span>
        <span className="block mb-2"><b>Management</b>: In addition to self-services, Afrofashion also offer premium and express management solutions to both buyers and sellers.
        This is ideal to meet certain user demands and preferences.</span>
        <span className="block mb-2"><b>Customer Support</b>: Afrofashion's business model puts a user's needs first. 
          We have dedicated customer support to address any queries or concerns promptly and efficiently.</span>
        <span className="block mb-2"><b>Marketing</b>: There is an uncontested need for marketing in commerce. With business subscription, 
          users are given access to a vast network of vendors and industry contacts to facilitate sales and growth.</span>
    </p>
</section>

      </div>
      <br/>
      
      <div id="buying">
        <h6><u>What do I need to start buying?</u></h6>
        <p>
          Start buying on AfroFashion by signing up as a <a href="/auth/register" className="link">buyer</a>, 
          with email - password or by using a <a href="/auth/register#google" className="link">google-mail </a>account. 
          <span className="block mt-2 mb-2"> Users can browse products randomly, 
            shop from the <a href="/marketplace" className="link">marketplace</a>, or buy items from verified sellers for free.
          </span> 
          There are also other extended services. Users with paid subscriptions can opt for personalized products and services.
        </p>

        <section id="user-management">
          <h6 className="pt-4 text-secondary"><b>User Management</b></h6>
          <p>
            User management is a key aspect of user-experence. Needless to say, we may not always be on time in serving user-specific demands,
            however, with the management features in place, a user can easily do regular and routine actions from their comfort zone. 
            <span className="block mb-2">Some interesting user-management features include:
            </span>
            <li><u>Save item for later</u>: Go to your profile to view all saved items</li>
            <li><u>Track orders</u>: Users can easily track their purchased items</li>
            <li><u>Personalized Ads</u>: Control what you see and only see what you like</li>
          </p>
        </section>
      </div>
      <br />
     
      <div id="selling">
        <h6><u>What do I need to start selling?</u></h6>
        <p>
          To start selling on AfroFashion, you will need to sign up as a <a href="/auth/register#seller" className="link">seller</a>, 
          and verify your account with email or phone.
          <span className="block mt-2 mb-2">Sellers are required to complete the verification process once, 
            on their prefered (primary) device, after which the sign-up credentials become void. 
          </span>  
          <span className="block mt-2 mb-2">Verified accounts can automatically and securely <a href="/auth/login" className="link">sign in</a> when connected, 
            using Google's firebase-auth providers.
          </span>
            There are limited and paid services on AfroFashion, however, 
            verified sellers can create or upload up to 5 products from their <a href="/profile" className="link">profile</a> on a free version.
          <span className="block mt-2 mb-2">See the pros & conditions for our paid <a href="/subscriptions" className="link">subscription</a> services,
            and how they can help sellers to grow and manage their fashion business on a Brand level.
          </span>
        </p>

        <section id="brands-management">
          <h6 className="pt-4 text-secondary"><b>Brands Management</b></h6>
          <p>
            Brands management is a critical and integral aspect of our eco-system. At Afrofasion, we care to enhance product visibility, authenticity, and consumer trust.
          <span className="block mt-3 mb-1">Simple strategies for brands management</span>
           <li> Brand Integrity: Stringent measures are in place to verify product authenticity, bolstering consumer confidence.</li>
           <li> Brand Promotion: Proactive marketing initiatives spotlight a brand's unique value and potential.</li>
           <li> Collaboration: Strategic partnerships can expand brand reach and resonate with diverse audience.</li>
           <li> Loyalty Programs: Tailored incentives motivate milestone sales and reward loyalty with royalty-free.</li>
          </p>
        </section>

      </div>
      <br />

      <div id="payments">
        <h6><u>Payments on Afro Fashion</u></h6>
        <p>
          Completing payments on e-commerce platforms don't come simpler than this. 
          AfroFashion offer users a good number of fast and seemless payment methods with
          <a className="link" href="https://flutterwave.com"> Flutterwave</a> and <a className="link" href="https://paystack.com">Paystack</a>.
          <span className="block mt-2 mb-2">
            Sellers are required to upload and verify their bank information from profile (with 10+ supported banks), to instantly receive
            payments from buyers who use these in-built payment solutions for item purchase.
          </span>
          When users (buyers, sellers) transact through our payment portals, they are inveherently leveraging the fast and secure solutions in place.
          This also means that the vendors involved are subject to tax, and therefore the transactions will incur some value-added-amounts.
        </p>

        <section id="subscription">
          <h6 className="pt-4 text-secondary"><b>Subscription</b></h6>
          <p>
            Afrofashion offer subscriptions that provide exclusive benefits for buyers and sellers.
            <span className="block mt-1 mb-2"> 
              Verified sellers can now directly navigate to subscribe, through Profile - Manage Subscription.
            </span>
            <span className="block mt-2 mb-3">Check out our <a href="/subscriptions" className="link">subscriptions</a> in detail.</span>
            <li>Basic Package</li>
            <li>Business Package</li>
            <li>Premium Package</li>
            <br/>
            <b>Please note:</b> clicking on '<b>Subscribe Now</b>' initiates a payment window, 
            so please do not start the process if you are not ready to pay
          </p>
        </section>
      </div>
      <br />

      <div id="shipping">
        <h6><u>Shipping with Afro Fashion</u></h6>
        <p>
          To start shipping with AfroFashion, 
          you will need a reliable courier service that is regulated and operational within the buyer-and-seller region.
          <span className="block mt-2 mb-2">Buyers and sellers use close-proximity services to enhance sales experience, 
            and ultimately bridge the gap between purchase and delivery of said products.
          </span>
          <span className="block mt-2 mb-2">Delivery for regular sales are handled between buyer and seller, 
            with Afro Fashion acting as the escrow for these transactions. However, milestone sales e.g.
            Sellers who complete 25 sales in one day, and Buyers with $1000+ spent at-a-go, etc.
            will earn free delivery with AfroFashion's Business Subscription. Premium version gets 3 free deliveries per month.
          </span>
          <b>Please Note</b>: Afrofashion will NOT be responsible for the shipping safety of items shipped without our delivery service.
        </p>
      </div>
    </section>
  );
};
