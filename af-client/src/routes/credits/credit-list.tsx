import React from "react";
import "../help/help.styles.scss";

export const CreditsList: React.FC = () => {
  return (
    <section className="help-list">
      <ul>
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