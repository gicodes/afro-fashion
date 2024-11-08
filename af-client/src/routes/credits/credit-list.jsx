import "../help/help.styles.scss";

export const CreditsList = () => {
  return (
    <section className="help-list">
      <ul className="custom-list">
        <li>
          <a href="#appreciation">Appreciation <span className="text-success"> *</span></a>
        </li>
        <li>
          <a href="#picture-credit">Contents</a>
        </li>
        <li>
          <a href="#management">Management</a>
        </li>
        <li>
          <a href="#sponsorship">Sponsorship</a>
        </li>
        <li>
          <a href="#developer-credit">Developer</a>
        </li>
      </ul>
    </section>
  );
};