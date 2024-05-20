import React from 'react'

const CreditsCard = () => {
    return (
      <section className="help-list-card">
        <div id="appreciation">
          <h4 className="pb-3">Appreciation</h4>
          <p>
            We would like to extend our heartfelt appreciation to Afrofashion, a beacon of innovation and empowerment in Fashion. 
            Afrofashion stands as a testament to the creativity, excellence and entrepreneurial spirit within and across Africa.
            <span className='block mt-1'>
              This is not just about an online platform, it is a driving force for economic growth, and a champion of small-scale African businesses.
              Through our comprehensive e-commerce services, Afrofashion empowers entrepreneurs and artisans to showcase their talents, reach a global audience, 
              and manage their businesses efficiently.
            </span>
              Afrofashion's dedication to cross-functionality not only enhances the shopping experience but also maximizes sales opportunities for vendors. 
              By leveraging its' vast customer base and innovative technologies, Afrofashion encourages and equips entrepreneurs to reach new heights and become a global brand.
            </p>
          </div><br/>

          <div id="picture-credit">
            <h4 className="pb-3">Contents</h4>
            <div className="mx-auto">
              <p>The captivating media pictures within this platform have been made possible by photographers, artists and content creators who share their work with the world.</p>
              <p> We have often outsourced these contents from;</p>
              <ul>
                <li className="mb-1">
                  <a className="fw-bold" href="https://unsplash.com">Unsplash:</a>{" "}
                    In appreciation to this community of photographers who provide royalty-free images that bring quality to AfroFashion.
                </li>
                <li className="mb-1">
                  <a className="fw-bold" href="https://istockphoto.com">iStockPhoto:</a>{" "}
                   Some of the stock photos on this platform are from this media outlet with premium, high-quality contents.
                </li>
                <li>Other worthy mentions– we deeply appreciate the contributions from i.ibb, cloudnairy and every other source that have featured or had a role in the visual experience of this platform.</li>
              </ul>
              <p>Creativity enriches this project, and we are grateful for the opportunity to showcase these amazing works on our platform.</p>
            </div>
          </div><br/>

          <div id="developer-credit">
            <h4 className="pb-3">Developer</h4>
            <p>
              This app was developed by <a className="link" href="https://github.com/gicodes" target="_blank" rel="noopener noreferrer">
              Gideon Iduma
              </a>– who is also the founder and pioneer of Afro Fashion.
            </p>

            <p>There are other notable mentions who have contributed to the development of this project such as <a className="link" href="https://github.com/KrownWealth" target="_blank" rel="noopener noreferrer">
                Adeola Abdulramon
              </a>, Chinwendu Oji, etc.</p>
              <span>You can find more about this Project from the  <a className="link" href="https://github.com/gicodes/afro-fashion" target="_blank" rel="noopener noreferrer">
                source code
              </a>.
            </span>
          </div>
        <br/>
        <div className='lg-div'></div>
    </section>
  )
}

export default CreditsCard