import React from "react";
import CreditsCard from "./credits-card.tsx";
import { CreditsList } from "./credit-list.tsx";

const CreditsPage = () => {
  return (
      <>
        <div className="card p-2 mb-2">
          <div className="card-title">
            <h3 className="text-center mx-auto bg-ws p-3">Credits</h3>
          </div>
          <div className="card container p-1">
            <div className="d-lg-flex help-container">
              <CreditsList />
              <CreditsCard />
          </div>
        </div>
          
        </div>
    </>
  );
};

export default CreditsPage;
