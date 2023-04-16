const Error2 = ({ errors, fieldName }) => {
  return errors && errors.hasOwnProperty(fieldName) ? (
    <p className="text-red-500 text-xs italic">{errors[fieldName]}</p>
  ) : (
    ""
  );
};

export default Error2;
