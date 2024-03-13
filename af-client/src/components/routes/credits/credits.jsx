const CreditsPage = () => {
  return (
      <>
        <div className="card p-2 mb-2">
          <div className="card-title">
            <h3 className="text-center mx-auto bg-ws p-3">Credits</h3>
          </div>

          <div className="card p-1 mt-1" id="picture-credits">
            <div className="card-body mx-auto">
              <div className="card-title">
                <h5 className="fw flex-just-center">Contents</h5>
              </div>
              <div className="mx-auto">
                <p>The captivating media pictures within this platform have been made possible by photographers, artists and content creators who share their work with the world.</p>
                <p>Outsourcing from the following platforms...</p>
                <ul>
                  <li className="mb-1">
                    <a className="s-bold" href="https://unsplash.com">Unsplash:</a>{" "}
                    In appreciation to this community of photographers who provide royalty-free images that bring quality to AfroFashion.
                  </li>
                  <li className="mb-1">
                    <a className="s-bold" href="https://istockphoto.com">iStockPhoto:</a>{" "}
                    Some of the stock photos on this platform are from this media outlet with premium, high-quality contents.
                  </li>
                  <li>Other worthy mentions– we deeply appreciate the contributions from i.ibb, cloudnairy and every other source that have featured or had a role in the visual experience of this platform.</li>
                </ul>
                <p>Creativity enriches this project, and we are grateful for the opportunity to showcase these amazing works on our platform.</p>
              </div>
            </div>
          </div>

          <div className="card p-1 mt-4" id="developer-credits">
            <div className="card-body">
              <div className="card-title">
                <h5 className="fw flex-just-center">Developer</h5>
              </div>

              <p>
                This app was developed by <a className="s-bold" href="https://github.com/gicodes" target="_blank" rel="noopener noreferrer">
                Gideon Iduma
                </a> – who is also the founder and pioneer of Afro Fashion.
              </p>

              <p>There are other notable mentions who have contributed to the development of this project such as <a className="s-bold" href="https://github.com/KrownWealth" target="_blank" rel="noopener noreferrer">
                Adeola Abdulramon
                </a>, Chinwendu Oji, etc.</p>
              <span>You can find more about this Project from the  <a className="s-bold" href="https://github.com/gicodes/afro-fashion" target="_blank" rel="noopener noreferrer">
              source code
                </a>.</span>
            </div>
          </div>
        </div>
    </>
  );
};

export default CreditsPage;
