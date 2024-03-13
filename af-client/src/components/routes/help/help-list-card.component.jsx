import "./help.styles.scss";

export const HelpListCard = () => {
  return (
    <section className="helpListCard">
      <div id="getting-started">
        <h4>Getting Started</h4>

        <h6 className="pt-2 text-secondary font-awesome"><b>Introduction</b></h6><br/>
        <p>
          AfroFashion is an African-first online platform that connect buyers to sellers, 
          offer complete e-commerce services and help small-scale african brands grow and manage their businesses.
        
          <span className="block mt-2 mb-2">Fashion-instas can take e-shopping to the next level with services from over 25 brands, 
            1000+ unique products & up to 15 item categories to choose from.
          </span>
          New and experienced vendors can both benefit from Afro Fashion branding and marketing thier products.
          Considering cross-functionality of our web, mobile and social media platforms,
          vendors are bound to make 5x the normal sales without worrying about customer base.
        </p>
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
            There are paid and limited services on AfroFashion, however, 
            verified sellers can create or upload up to 5 products from their <a href="/profile" className="link">profile</a> on a free version.
          <span className="block mt-2 mb-2">See the pros & conditions for our paid <a href="/subscriptions" className="link">subscription</a> services,
            and how they can help sellers to grow and manage their fashion business on a Brand level.
          </span>
        </p>
      </div>
      <br />

      <div id="payments">
        <h6><u>Payments on Afro Fashion</u></h6>
        <p>
          Completing payments on e-commerce platforms don't come simpler than this. 
          AfroFashion offer users a good number of fast and seemless payment methods with
          <a className="link" href="https://flutterwave.com"> Flutterwave</a> and <a className="link" href="https://paystack.com">Paystack</a>.
          <span className="block mt-2 mb-2">
            Sellers are required to upload their payment information from the profile, to instantly receive
            payments from buyers who use these in-built payment solutions for item purchase.
          </span>
          When users (buyers, sellers) transact through our payment portals, they are inveherently leveraging the fast and secure solutions in place.
          This also means that the vendors involved are subject to tax, and therefore the transactions will incur some value-added-amounts.
        </p>
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
          <b>Please Note</b>: AfroFashion does NOT bear responsibility for the shipping safety of items shipped without our delivery service.
        </p>
      </div>
    </section>
  );
};
