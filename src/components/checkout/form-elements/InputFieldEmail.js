import Error2 from "../Error2";
import PropTypes from "prop-types";

const InputFieldEmail = ({
  handleOnChange,
  inputValue,
  name,
  type,
  errors,
  placeholder,
}) => {
  return (
    <div>
      <input
        onChange={handleOnChange}
        value={inputValue}
        placeholder={placeholder}
        type={type}
        name={name}
        className="w-full border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none"
        id={name}
      />
      <Error2 errors={errors} fieldName={name} />
    </div>
  );
};

InputFieldEmail.propTypes = {
  handleOnChange: PropTypes.func,
  inputValue: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  containerClassNames: PropTypes.string,
};

InputFieldEmail.defaultProps = {
  handleOnChange: () => null,
  inputValue: "",
  name: "",
  type: "text",
  label: "",
  placeholder: "",
  errors: {},
  required: false,
  containerClassNames: "",
};

export default InputFieldEmail;
