import './sign-in.styles.scss';
import React from 'react';

const FormField = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input
        className="form-input"
        {...otherProps}
      />
      {
        label && (
          <label
            className={`form-input-label
            ${otherProps.value.length ? 'shrink' : null}
          `}>
            {label}
          </label>
        )}
    </div>
  )
}


export default FormField;