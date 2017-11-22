"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderTextareaWidget(_ref) {
  var input = _ref.input,
      customProps = _ref.customProps;
  var id = customProps.id,
      options = customProps.options,
      placeholder = customProps.placeholder,
      required = customProps.required,
      disabled = customProps.disabled,
      readonly = customProps.readonly,
      autofocus = customProps.autofocus,
      onBlur = customProps.onBlur,
      onFocus = customProps.onFocus;

  var value = input.value;
  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;

    return input.onChange(value === "" ? options.emptyValue || "" : value);
  };
  return _react2.default.createElement("textarea", {
    id: id,
    className: "form-control",
    value: typeof value === "undefined" ? "" : value,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    autoFocus: autofocus,
    rows: options.rows,
    onBlur: onBlur && function (event) {
      return onBlur(id, event.target.value);
    },
    onFocus: onFocus && function (event) {
      return onFocus(id, event.target.value);
    },
    onChange: _onChange
  });
}

function TextareaWidget(props) {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_reduxForm.Field, {
      name: props.id,
      component: renderTextareaWidget,
      customProps: props
    })
  );
}

TextareaWidget.defaultProps = {
  autofocus: false,
  options: {}
};

if (process.env.NODE_ENV !== "production") {
  TextareaWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    placeholder: _propTypes2.default.string,
    options: _propTypes2.default.shape({
      rows: _propTypes2.default.number
    }),
    value: _propTypes2.default.string,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    autofocus: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onFocus: _propTypes2.default.func
  };
}

exports.default = TextareaWidget;