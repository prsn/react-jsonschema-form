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

function renderRadioWidgets(_ref) {
  var input = _ref.input,
      customProps = _ref.customProps;
  var options = customProps.options,
      required = customProps.required,
      disabled = customProps.disabled,
      readonly = customProps.readonly,
      autofocus = customProps.autofocus,
      _onChange = customProps.onChange;
  // Generating a unique field name to identify this set of radio buttons

  var name = Math.random().toString();
  var enumOptions = options.enumOptions,
      inline = options.inline;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.

  return _react2.default.createElement(
    "div",
    { className: "field-radio-group" },
    enumOptions.map(function (option, i) {
      var checked = option.value === input.value;
      var disabledCls = disabled || readonly ? "disabled" : "";
      var radio = _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement("input", {
          type: "radio",
          checked: checked,
          name: name,
          required: required,
          value: option.value,
          disabled: disabled || readonly,
          autoFocus: autofocus && i === 0,
          onChange: function onChange(_) {
            _onChange(option.value);
            input.onChange(option.value);
          }
        }),
        _react2.default.createElement(
          "span",
          null,
          option.label
        )
      );

      return inline ? _react2.default.createElement(
        "label",
        { key: i, className: "radio-inline " + disabledCls },
        radio
      ) : _react2.default.createElement(
        "div",
        { key: i, className: "radio " + disabledCls },
        _react2.default.createElement(
          "label",
          null,
          radio
        )
      );
    })
  );
}
function RadioWidget(props) {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_reduxForm.Field, {
      name: props.id,
      component: renderRadioWidgets,
      customProps: props
    })
  );
}

RadioWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    options: _propTypes2.default.shape({
      enumOptions: _propTypes2.default.array,
      inline: _propTypes2.default.bool
    }).isRequired,
    value: _propTypes2.default.any,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    autofocus: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
  };
}
exports.default = RadioWidget;