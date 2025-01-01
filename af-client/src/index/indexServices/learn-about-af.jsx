// These components are childen of "learnAboutAF" so there are no single default exports

const PrivacyTemp = ({ header, hNum, body }) => {
  return (
    <div className='card my-1 p-3'>
      <h6>
        {header} &nbsp; <span className="text-gray">[{hNum}] </span>
      </h6>
      {hrStyled}
      <div> {body} </div>
    </div>
  )
}

const hrStyled = () =>
  <div className='h-center'>
    <hr className='w-25'/>
  </div>

const TermsTemplate = ({ header, body }) => {
  return (
    <div className='px-3'>
      <h6>
        {header}
      </h6>
      {hrStyled}
      <div> {body} </div>
    </div>
  )
}

export const PrivacyPolicy = () => {
  return (
    <>
      <div className='card p-2 policies'>
        <div className='card-header'>
          <h4>Privacy Policy</h4>
        </div>

        <div className='card-body container'>
          <div className='p-3'>
            <p>This Privacy Policy describes how Afrofashion (referred to as "we", "us", or "our") 
              collects, uses, and discloses your Personal Information when you visit or make a purchase from the Afrofashion platform.</p>
          </div>

          <PrivacyTemp
            header='Personal Collection & Use'
            hNum='1.0'
            body={
              <>
                <p>
                  When you interact with Afrofashion, we collect certain information about your device, 
                  your interaction with the platform, and information necessary to process your purchases. 
                  We may also collect additional information if you contact us for customer support. In this Privacy Policy, 
                  we refer to any information that can uniquely identify an individual (including the information below) as "Personal Information". 
                  See the list below for more information about what Personal Information we collect and why.
                </p>

                <span>
                   <span className="fs-smaller"> [1.1] &nbsp;  </span> <b>Device information</b>
                </span>
                <p>
                  Examples of Personal Information collected include; version of web browser, IP address, time zone, cookie information, viewed products, search terms, and interactions with the platform.
                  The purpose of this is to optimize the platform and perform analytics on usage.
                  These information are collected automatically using cookies, log files, web beacons, tags, or pixels.
                  Disclosure for smooth business transition can be shared with our processors Google and Flutterwave.
                </p>
                <span>
                  <span className="fs-smaller"> [1.2] &nbsp;  </span> <b>Order information</b> 
                </span>
                <p>
                  Examples of Personal Information collected include; name, billing address, shipping address, payment information, email address, and phone number.
                  Purpose of this is to fulfill orders, process payments, arrange shipping, provide invoices and order confirmations, communicate with users, and provide relevant information or advertising.
                  These informations are collected from verified users: sellers and buyers.
                </p>
                <span>
                  <span className="fs-smaller"> [1.3] &nbsp;  </span> <b>Customer support information</b> 
                </span>
                <p>
                  Examples of Personal Information collected include; information provided during customer support interactions.
                  The purpose of this is to provide customer support.
                  The source of collection is through and with the users consent.
                  Disclosure for a business purpose: shared with our customer support vendors.
                </p>
              </>
            } 
          />

          <PrivacyTemp 
            header={"Minors"}
            hNum='2.0'
            body={
              <p> Afrofashion is not intended for individuals under the age of <b>12</b>. &nbsp; We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us to request deletion. </p>
            }
          />

          <PrivacyTemp 
            header={"Lawful Basis"}
            hNum={'3.0'}
            body={
              <>
                <p>
                  We process your personal information under various lawful bases, including consent, the performance of contracts, compliance with legal obligations, protection of vital interests, tasks carried out in the public interest, and our legitimate interests.
                </p>

                <span>
                  <span className="fs-smaller"> [3.1] &nbsp;  </span> <b>Automatic decision-making</b>
                </span>
                <p>
                  We do not engage in fully automated decision-making that has a legal or otherwise significant effect using customer data.
                </p>

                <span>
                  <span className="fs-smaller"> [3.2] &nbsp;  </span> <b>Retention</b>
                </span>
                <p>
                  We retain your Personal Information for our records unless and until you ask us to erase this information.
                </p>

                <span>
                  <span className="fs-smaller"> [3.3] &nbsp;  </span> <b>Your Rights</b>
                </span>
                <p>
                  If you are a resident of certain regions, including the European Economic Area (EEA) or California, you have certain rights regarding your Personal Information. Please contact us for more information.
                </p>
              </>
            }
          />
          
          <PrivacyTemp 
            header={"Cookies"}
            hNum={'4.0'}
            body={
              <>
                <p>
                  We use cookies to optimize your experience on our platform. You can control and manage cookies in various ways, but please note that blocking cookies may impact your user experience.
                </p>

                <span>
                  <span className="fs-smaller"> [4.1] &nbsp;  </span> <b>Do Not Track</b>
                </span>
                <p>
                  We do not alter our data collection and usage practices in response to "Do Not Track" signals from your browser.
                </p>
              </>
            }
          />

          <PrivacyTemp 
            header={"Changes"}
            hNum={'5.0'}
            body={
              <p> We may update this Privacy Policy from time to time. We encourage you to review this policy periodically for any changes. </p>
            }  
          />
          
          <p className="my-5">
            For more information about our privacy practices or if you have questions, please contact us at <b>info@afrofashion.site</b>.
            <span className="block my-1"> If you are not satisfied with our response to your complaint, you have the right to lodge your complaint with the relevant data protection authority.</span>
          </p>  
            
          <div className='lg-div fs-smaller'>
            Last updated: <i>26/04/2024</i>
          </div>
        </div>
      </div>
    </>
    )
  }


export const TermsOfService = () => {
  return (
    <>
      <div className='card p-2 policies'>
        <div className='card-header'>
          <h4>Terms Of Service</h4>
        </div>

        <div className='card-body container'>
          <TermsTemplate 
            header='Overview'
            body={
              <p>
                This website is operated by Afrofashion. Throughout the site, the terms “we”, “us”, and “our” refer to Afrofashion. 
                Afrofashion offers this website, including all information, tools, and services available from this site to you, the user, 
                conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
                <span className="block my-1">
                  By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions 
                  (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. 
                  These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
                </span>
                <span className="block my-1">
                  Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. 
                  If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                </span>
                <span className="block my-1">
                  Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. 
                  We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. 
                  Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                </span>
                <span className="block my-1">
                  Our store is hosted on Netlify Inc. They provide us with the hosting for our online e-commerce platform that allows us to sell our products and services to you.
                </span>
              </p>
            }
          />

          <TermsTemplate
            header='SECTION 1 - ONLINE STORE TERMS'
            body={
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, 
                or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                <span className="block my-1">
                  You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                </span>
                <span className="block my-1">
                  A breach or violation of any of the Terms will result in an immediate termination of your Services.
                </span>
              </p>
            }
          />

          <TermsTemplate 
            header={"SECTION 2 - GENERAL CONDITIONS"}
            body={
              <p>
                We reserve the right to refuse service to anyone for any reason at any time.
                You understand that your content (not including credit information), may be transferred unencrypted and involve 
                (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. 
                Credit card information is always encrypted during transfer over networks.
                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, 
                use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
              </p>
            }
          />

          <TermsTemplate 
            header={"SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION"}
            body={
              <p>
                <span>
                  We are not responsible if information made available on this site is not accurate, complete or current. 
                  The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information. Any reliance on the material on this site is at your own risk.
                </span>
                <span className="block my-1">
                  This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. 
                  You agree that it is your responsibility to monitor changes to our site.
                </span>
              </p>
            }
          />

          <TermsTemplate
            header={"SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES"}
            body={
              <>
                <p>
                  Prices for our products are subject to change without notice.
                </p>
                <p>
                  We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </p>
                <p>
                  We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                </p>
              </>
            }
          />

          <TermsTemplate 
            header={"SECTION 5 - PRODUCTS OR SERVICES (if applicable)"}
            body={
              <>
                <p>
                  Certain products or services may be available exclusively online through the website. 
                  These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
                </p>  
                <p>
                  We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. 
                  We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>
                <p>
                  We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. 
                  We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. 
                  All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
                </p>
                <p>
                  We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                </p>
              </>
            }
          />

          <TermsTemplate 
            header={"SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION"}
            body={
              <>
                <p>
                  We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 
                  These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. 
                  In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. 
                  We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
                </p>  
                <p>
                  You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. 
                  You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                </p>
                <p>
                  For more detail, please review our Returns Policy.  We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                </p>
              </>
            }
          />

          <TermsTemplate 
            header={"SECTION 7 - OPTIONAL TOOLS"} 
            body={
              <>
                <p>
                  We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.
                </p>  
                <p>
                  You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. 
                  We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
                </p>
                <p>
                  Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
                </p>
                <p>We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.</p>
              </>
            }
          />

          <TermsTemplate 
            header={"SECTION 8 - THIRD-PARTY LINKS"}
            body={
              <p>
                Certain content, products, and services available via our Service may include materials from third-parties.
                <span className="block my-1">
                  Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.
                </span>
                <span>
                  We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. 
                  Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
                </span>
              </p>
            }
          />

          <TermsTemplate 
            header={"SECTION 9 - USER COMMENTS, FEEDBACK"}
            body={
              <p>
                <span>
                  If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, 
                  by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, 
                  translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
                </span>  
                <span className="block my-1">
                  We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.
                </span>
                <span>
                  You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. 
                  You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. 
                  You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
                </span>
              </p>
            }
          />

          <TermsTemplate 
            header="SECTION 10 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS"
            body={
              <p> Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy, click <a className='link' href='/privacy-policy'>here</a>. </p>
            }
          />
            
          <TermsTemplate 
            header={"SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS"}
            body={
              <p>
                Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, 
                promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, 
                inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).
                <span className="block my-1">
                  We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. 
                  No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.
                </span> 
              </p>
            }
          />

          <TermsTemplate 
            header={"SECTION 12 - PROHIBITED USES"}
            body={
              <p>
              In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; 
              (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; 
              (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; 
              (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; 
              (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, 
              other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
            </p>
            }
          />

          <TermsTemplate 
            header={"SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY"} 
            body={
              <p>
                We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
                <span className="block my-1">
                  We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
                </span>
                <span>
                  You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
                </span>
                <span className="block my-1">
                  You expressly agree that your use of, or inability to use, the service is at your sole risk. 
                  The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, 
                  without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, 
                  merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
                </span>
                <span>
                    In no case shall Afrofashion, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, 
                    loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, 
                    loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, 
                    or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, 
                    or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
                  </span>
                </p>
              }
            />

            <TermsTemplate 
              header={"SECTION 14 - INDEMNIFICATION"}
              body={
                <p> You agree to indemnify, defend and hold harmless Afrofashion and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, 
                subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
              </p>
            }
          />

          <TermsTemplate
            header={"SECTION 15 - SEVERABILITY"}
            body={
              <p>
                In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, 
                and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
              </p>
            }
          />

          <TermsTemplate
            header={"SECTION 16 - TERMINATION"}
            body={
              <>
                <p>
                  The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
                </p>
                <p>
                  These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
                </p>
                <p>
                  If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, 
                  we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
                </p>
              </>
            }
          />

          <TermsTemplate 
            header={"SECTION 17 - ENTIRE AGREEMENT"}
            body={
              <p>
                The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
                <span className="block my-1">
                  These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).
                </span>
                Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
              </p>
            } 
          />

          <TermsTemplate
            header={"SECTION 18 - CHANGES TO TERMS OF SERVICE"}
            body={
              <p> These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Nigeria. </p>
            }
          />

          <TermsTemplate
            header={"SECTION 19 - GOVERNING LAW"}
            body={
              <p>
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Nigeria.
                <span>
                  We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. 
                  It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
                </span>
              </p>
            }
          />

          <TermsTemplate 
            header={"SECTION 20 - CONTACT INFORMATION"}
            body={
              <p>
                Questions about the Terms of Service should be sent to us at <a  href='mailto:info@afrofashion.site'>info@afrofashion.site</a>
              </p>
            }
          />
        </div>
      </div>
    </>
  )
}