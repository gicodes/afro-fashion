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
                <p>The captivating visuals within this platform have been made possible by the talented photographers and artists who share their work with the world. </p>
                <p>Special thanks to the following platforms:</p>
                <ul>
                  <li className="mb-1">
                    <a className="s-bold" href="https://unsplash.com">Unsplash:</a>{" "}
                    Generous community of photographers providing high-quality, royalty-free images that breathe life into this project.
                  </li>
                  <li className="mb-1">
                    <a className="s-bold" href="https://istockphoto.com">iStockPhoto:</a>{" "}
                    Premium source for stock photos, illustrations, and videos that enhance the visual appeal of this application.
                  </li>
                  <li>Any other mentions we may be forgetting– we deeply appreciate the contributions from all other sources that have played a role in creating the visual experience of this application.</li>
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
