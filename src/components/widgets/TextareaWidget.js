import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

function renderTextareaWidget({ input, customProps }) {
  const {
    id,
    options,
    placeholder,
    required,
    disabled,
    readonly,
    autofocus,
    onBlur,
    onFocus,
  } = customProps;
  const value = input.value;
  const _onChange = ({ target: { value } }) => {
    return input.onChange(value === "" ? options.emptyValue || "" : value);
  };
  return (
    <textarea
      id={id}
      className="form-control"
      value={typeof value === "undefined" ? "" : value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      rows={options.rows}
      onBlur={onBlur && (event => onBlur(id, event.target.value))}
      onFocus={onFocus && (event => onFocus(id, event.target.value))}
      onChange={_onChange}
    />
  );
}

function TextareaWidget(props) {
  return (
    <div>
      <Field
        name={props.id}
        component={renderTextareaWidget}
        customProps={props}
      />
    </div>
  );
}

TextareaWidget.defaultProps = {
  autofocus: false,
  options: {},
};

if (process.env.NODE_ENV !== "production") {
  TextareaWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.shape({
      rows: PropTypes.number,
    }),
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default TextareaWidget;
