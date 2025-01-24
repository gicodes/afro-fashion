import React from 'react';

interface RedirectTemplateProps {
  title: string;
  body: string;
  imgSrc: string;
  imgAlt: string;
  children: any
}

export const RedirectTemplate: React.FC<RedirectTemplateProps> = ({ title, imgSrc, imgAlt, body, children }) => {
  return (
    <>
      <div className="card p-2 mb-2 vh-100">
        <div className="mx-auto text-center">
          <div className="card-title mt-5">
            <h2 className="mx-auto bg-ws p-2">{title}</h2>
          </div>
          <div className="mt-5">
            <img
              loading="lazy"
              alt={imgAlt}
              className="mt-5 fullWidth"
              src={imgSrc}
            />
          </div>
          <div className="lg-div"></div>
          <div className="mt-3 p-3">
            {body}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};