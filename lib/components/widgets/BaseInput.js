"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require("redux-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function renderBase(_ref) {
  var input = _ref.input,
      customProps = _ref.customProps;

  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  var readonly = customProps.readonly,
      disabled = customProps.disabled,
      autofocus = customProps.autofocus,
      onBlur = customProps.onBlur,
      onFocus = customProps.onFocus,
      options = customProps.options,
      schema = customProps.schema,
      formContext = customProps.formContext,
      registry = customProps.registry,
      inputProps = _objectWithoutProperties(customProps, ["readonly", "disabled", "autofocus", "onBlur", "onFocus", "options", "schema", "formContext", "registry"]);

  var value = input.value;
  inputProps.type = options.inputType || inputProps.type || "text";
  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;

    return input.onChange(value === "" ? options.emptyValue || "" : value);
  };
  return _react2.default.createElement("input", _extends({
    className: "form-control",
    readOnly: readonly,
    disabled: disabled,
    autoFocus: autofocus
  }, inputProps, {
    value: value,
    onChange: _onChange,
    onBlur: onBlur && function (event) {
      return onBlur(inputProps.id, event.target.value);
    },
    onFocus: onFocus && function (event) {
      return onFocus(inputProps.id, event.target.value);
    }
  }));
}
function BaseInput(props) {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_reduxForm.Field, { name: props.id, component: renderBase, customProps: props })
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: _propTypes2.default.string.isRequired,
    placeholder: _propTypes2.default.string,
    value: _propTypes2.default.any,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    autofocus: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onFocus: _propTypes2.default.func
  };
}

exports.default = BaseInput;