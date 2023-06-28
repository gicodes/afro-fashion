import './sign-up.styles.scss';

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