"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reduxForm = require("redux-form");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(_ref, value) {
  var type = _ref.type,
      items = _ref.items;

  if (value === "") {
    return undefined;
  } else if (type === "array" && items && ["number", "integer"].includes(items.type)) {
    return value.map(_utils.asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return (0, _utils.asNumber)(value);
  }
  return value;
}

function getValue(event, multiple) {
  if (multiple) {
    return [].slice.call(event.target.options).filter(function (o) {
      return o.selected;
    }).map(function (o) {
      return o.value;
    });
  } else {
    return event.target.value;
  }
}

function renderSelect(_ref2) {
  var input = _ref2.input,
      customProps = _ref2.customProps;
  var schema = customProps.schema,
      id = customProps.id,
      options = customProps.options,
      required = customProps.required,
      disabled = customProps.disabled,
      readonly = customProps.readonly,
      multiple = customProps.multiple,
      autofocus = customProps.autofocus,
      _onChange = customProps.onChange,
      onBlur = customProps.onBlur,
      onFocus = customProps.onFocus,
      placeholder = customProps.placeholder;
  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled;

  var emptyValue = multiple ? [] : "";
  return _react2.default.createElement(
    "select",
    {
      id: id,
      multiple: multiple,
      className: "form-control",
      value: typeof input.value === "undefined" ? emptyValue : input.value,
      required: required,
      disabled: disabled || readonly,
      autoFocus: autofocus,
      onBlur: onBlur && function (event) {
        var newValue = getValue(event, multiple);
        onBlur(id, processValue(schema, newValue));
      },
      onFocus: onFocus && function (event) {
        var newValue = getValue(event, multiple);
        onFocus(id, processValue(schema, newValue));
      },
      onChange: function onChange(event) {
        var newValue = getValue(event, multiple);
        _onChange(processValue(schema, newValue));
        input.onChange(processValue(schema, newValue));
      } },
    !multiple && !schema.default && _react2.default.createElement(
      "option",
      { value: "" },
      placeholder
    ),
    enumOptions.map(function (_ref3, i) {
      var value = _ref3.value,
          label = _ref3.label;

      var disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
      return _react2.default.createElement(
        "option",
        { key: i, value: value, disabled: disabled },
        label
      );
    })
  );
}

function SelectWidget(props) {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_reduxForm.Field, { name: props.id, component: renderSelect, customProps: props })
  );
}

SelectWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    id: _propTypes2.default.string.isRequired,
    options: _propTypes2.default.shape({
      enumOptions: _propTypes2.default.array
    }).isRequired,
    value: _propTypes2.default.any,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    multiple: _propTypes2.default.bool,
    autofocus: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onFocus: _propTypes2.default.func
  };
}

exports.default = SelectWidget;