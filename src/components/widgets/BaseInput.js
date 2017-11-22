import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

function renderBase({ input, customProps }) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  const {
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    formContext,
    registry,
    ...inputProps
  } = customProps;
  const value = input.value;
  inputProps.type = options.inputType || inputProps.type || "text";
  const _onChange = ({ target: { value } }) => {
    customProps.onChange(value === "" ? options.emptyValue : value);
    return input.onChange(value === "" ? options.emptyValue || "" : value);
  };
  return (
    <input
      className="form-control"
      readOnly={readonly}
      disabled={disabled}
      autoFocus={autofocus}
      {...inputProps}
      value={value}
      onChange={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
      onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
    />
  );
}
function BaseInput(props) {
  return (
    <div>
      <Field name={props.id} component={renderBase} customProps={props} />
    </div>
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default BaseInput;
