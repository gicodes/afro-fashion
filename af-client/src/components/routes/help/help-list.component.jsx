import "./help.styles.scss";

export const HelpList = () => {
  return (
    <section className="helpList">
      <ul className="custom-list">
        <li>
          <a href="#getting-started">Getting Started 
            <span className="text-success"> *</span>
          </a>
        </li>
        <li>
          <a href="#buying">Buying on AfroFashion</a>
        </li>
        <li>
          <a href="#selling">Selling with AfroFashion</a>
        </li>
        <li>
          <a href="#payments">Payments on AfroFashion</a>
        </li>
        <li>
          <a href="#shipping">Shipping with AfroFashion</a>
        </li>
      </ul>
    </section>
  );
};
