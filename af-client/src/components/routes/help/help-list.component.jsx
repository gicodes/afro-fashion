import "./help.styles.scss";

export const HelpList = () => {
  return (
    <section className="help-list">
      <ul className="custom-list">
        <li>
          <a href="#getting-started">Introduction 
            <span className="text-success"> *</span>
          </a>
        </li>
        <li>
          <a href="#buying">Getting Started</a>
        </li>
        <li>
          <a href="#buying">Buying on Afrofashion</a>
        </li>
        <li>
          <a href="#selling">Selling with Afrofashion</a>
        </li>
        <li>
          <a href="#payments">Payments on Afrofashion</a>
        </li>
        <li>
          <a href="#shipping">Shipping with Afrofashion</a>
        </li>
      </ul>
    </section>
  );
};
